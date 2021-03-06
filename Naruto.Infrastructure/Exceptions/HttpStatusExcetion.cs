﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Naruto.Infrastructure.Exceptions
{
    /// <summary>
    /// http状态的异常
    /// </summary>
    public abstract class HttpStatusExcetion : ApplicationException
    {
        public HttpStatusExcetion(string messsage):base(messsage) {

        }
        public virtual HttpStatusCode StatusCode => HttpStatusCode.OK;
    }
}
