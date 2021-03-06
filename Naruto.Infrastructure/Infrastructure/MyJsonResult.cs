﻿using System;
using System.Collections.Generic;
using System.Text;
using Naruto.Infrastructure.Interface;
namespace Naruto.Infrastructure
{
    /// <summary>
    /// 定义一个json返回类型 用于接口的返回
    /// </summary>
    public class MyJsonResult : ICommonClassDependency
    {
        /// <summary>
        /// 页数
        /// </summary>
        public int pageCount { get; set; }
        /// <summary>
        /// 总条数
        /// </summary>
        public int recordCount { get; set; }
        /// <summary>
        /// 返回的数据
        /// </summary>
        public object rows { get; set; }
        /// <summary>
        /// 返回成功的状态
        /// </summary>

        public int code { get; set; } = (int)Enum.MyJsonResultEnum.successCode;
        /// <summary>
        /// 消息
        /// </summary>

        public string msg { get; set; } = "操作成功";
        /// <summary>
        /// 错误消息
        /// </summary>
        public string failMsg { get; set; }
    }
}
