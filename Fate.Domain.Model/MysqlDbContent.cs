﻿using System;
using System.Collections.Generic;
using System.Text;
using Fate.Domain.Model.Entities;
using Microsoft.EntityFrameworkCore;

//using Fate.Domain.Model.Entities;

namespace Fate.Domain.Model
{
    public class SlaveMysqlDbContent : DbContext
    {
        public SlaveMysqlDbContent(DbContextOptions<SlaveMysqlDbContent> options2)
          : base(options2)
        {

        }
        public DbSet<setting> setting { get; set; }
        public DbSet<test1> test1 { get; set; }
    }
    public class MysqlDbContent : DbContext
    {
        public MysqlDbContent(DbContextOptions<MysqlDbContent> options)
           : base(options)
        {

        }
        public MysqlDbContent Clone()
        {
            return this.MemberwiseClone() as MysqlDbContent;
        }
        //public DbSet<OrderNo> OrderNo { get; set; }
        public DbSet<setting> setting { get; set; }
        public DbSet<test1> test1 { get; set; }

    }
}
