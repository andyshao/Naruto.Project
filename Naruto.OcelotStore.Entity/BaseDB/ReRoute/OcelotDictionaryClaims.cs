﻿ using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Naruto.OcelotStore.Entity
{
    [Table("OcelotDictionaryClaims")]
    /// <summary>
    /// 字典的配置
    /// </summary>
    public class OcelotDictionaryClaims : BaseRepository.Model.IEntity
    {
        /// <summary>
        /// 主键Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 父节点的id
        /// </summary>
        public int ParentId { get; set; }
        /// <summary>
        /// 存放的字典的类型  0 AddHeadersToRequest  1 AddClaimsToRequest 2 RouteClaimsRequirement 3   AddQueriesToRequest
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 关键字
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; set; }
    }
}
