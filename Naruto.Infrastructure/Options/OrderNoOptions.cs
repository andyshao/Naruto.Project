﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Infrastructure.Options
{
    /// <summary>
    /// 配置单号所使用的上下文
    /// </summary>
    public class OrderNoOptions
    {
        public Type TUnitOfWorkType { get; set; }
    }
}
