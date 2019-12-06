﻿using Fate.Infrastructure.Redis.IRedisManage;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Fate.Infrastructure.Configuration
{
    public class DefaultReloadData : DefaultFateConfigurationLoad, IReloadData
    {

        private readonly IRedisOperationHelp redis;
        private readonly IConfiguration configuration;

        public DefaultReloadData(IRedisOperationHelp _redis, IConfiguration _configuration)
        {
            redis = _redis;
            configuration = _configuration;
        }
        /// <summary>
        /// 订阅加载事件
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public async Task SubscribeReloadAsync(object obj)
        {
            await redis.RedisSubscribe().SubscribeAsync(FateConfigurationInfrastructure.SubscribeKey, async (channel, value) =>
              {
                  //重新获取数据
                  var data = await LoadConfiguration();
                  data.ToList().ForEach(item =>
                  {
                      configuration[item.Key] = item.Value;
                  });
              });
        }
    }
}
