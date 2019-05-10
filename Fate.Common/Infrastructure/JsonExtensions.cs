﻿using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
namespace Fate.Common.Infrastructure
{
    /// <summary>
    /// json扩展
    /// </summary>
    public static class JsonExtensions
    {
        /// <summary>
        /// json序列化
        /// </summary>
        /// <param name="soure"></param>
        /// <returns></returns>
        public static string ToJson(this object soure)
        {
            if (soure == null)
                return null;
            return JsonConvert.SerializeObject(soure);
        }
        /// <summary>
        /// 将json字符串序列化为字典类型
        /// </summary>
        /// <param name="soure"></param>
        /// <returns></returns>
        public static Dictionary<string, object> ToDic(this string soure)
        {
            if (string.IsNullOrWhiteSpace(soure))
                return null;
            return JsonConvert.DeserializeObject<Dictionary<string, object>>(soure);
        }
    }
}
