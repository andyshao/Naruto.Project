﻿using Fate.Infrastructure.Redis.IRedisManage;
using Fate.Infrastructure.Redis.RedisConfig;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fate.Infrastructure.Redis.RedisManage
{
    /// <summary>
    /// 
    /// </summary>
    public class RedisSet: IRedisSet
    {
        private readonly IRedisBase redisBase;

        private readonly RedisPrefixKey redisPrefixKey;

        /// <summary>
        /// 实例化连接
        /// </summary>
        public RedisSet(IRedisBase _redisBase, IOptions<RedisOptions> options)
        {
            redisBase = _redisBase;
            //初始化key的前缀
            redisPrefixKey = options.Value.RedisPrefix ?? new RedisPrefixKey();
        }
        #region 同步
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public bool SetAdd<T>(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return redisBase.DoSave(db => db.SetAdd(key, value));
        }
        /// <summary>
        /// 移除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public bool SetRemove<T>(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return redisBase.DoSave(db => db.SetRemove(key, value));
        }
        /// <summary>
        /// 取值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public string[] SetGet<T>()
        {
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return redisBase.DoSave(db => db.SetMembers(key)).ToStringArray();
        }
        /// <summary>
        /// 取值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public string[] SetGet(string key)
        {
            return redisBase.DoSave(db => db.SetMembers(redisPrefixKey.SetPrefixKey + key)).ToStringArray();
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public bool SetAdd(string key, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            return redisBase.DoSave(db => db.SetAdd(redisPrefixKey.SetPrefixKey + key, value));
        }
        /// <summary>
        /// 移除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void SetRemove(string key, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            redisBase.DoSave(db => db.SetRemove(redisPrefixKey.SetPrefixKey + key, value));
        }
        #endregion
        #region 异步
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public async Task<bool> SetAddAsync<T>(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return await redisBase.DoSave(db => db.SetAddAsync(key, value));
        }
        /// <summary>
        /// 移除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public async Task<bool> SetRemoveAsync<T>(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return await redisBase.DoSave(db => db.SetRemoveAsync(key, value));
        }
        /// <summary>
        /// 取值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public async Task<string[]> SetGetAsync<T>()
        {
            //反射实体的信息
            var type = typeof(T);
            string key = redisPrefixKey.SetPrefixKey + type.Name;
            return (await redisBase.DoSave(db => db.SetMembersAsync(key))).ToStringArray();
        }
        /// <summary>
        /// 取值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public async Task<string[]> SetGetAsync(string key)
        {
            return (await redisBase.DoSave(db => db.SetMembersAsync(redisPrefixKey.SetPrefixKey + key))).ToStringArray();
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public async Task<bool> SetAddAsync(string key, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            return await redisBase.DoSave(db => db.SetAddAsync(redisPrefixKey.SetPrefixKey + key, value));
        }
        /// <summary>
        /// 移除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public async Task<bool> SetRemoveAsync(string key, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException(nameof(value));
            }
            return await redisBase.DoSave(db => db.SetRemoveAsync(redisPrefixKey.SetPrefixKey + key, value));
        }
        #endregion
    }
}