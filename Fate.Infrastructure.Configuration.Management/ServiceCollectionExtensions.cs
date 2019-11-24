﻿using Fate.Infrastructure.Configuration.Management;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Fate.Infrastructure.Configuration.Management.Dashboard;
using Fate.Infrastructure.Configuration.Management.Dashboard.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Fate.Infrastructure.Configuration.Management.Dashboard.Services;
using System;
using Fate.Infrastructure.VirtualFile;
using System.Collections.Generic;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// 注入配置界面
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddConfigurationManagement(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.Services.AddServices();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(ServiceCollectionExtensions).Assembly));
            });
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddConfigurationManagement(this IMvcBuilder mvcBuilder, Action<ConfigurationOptions> option)
        {
            mvcBuilder.Services.Configure(option);
            mvcBuilder.AddConfigurationManagement();
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddConfigurationManagement(this IMvcCoreBuilder mvcBuilder)
        {
            mvcBuilder.Services.AddServices();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(ServiceCollectionExtensions).Assembly));
            });
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddConfigurationManagement(this IMvcCoreBuilder mvcBuilder, Action<ConfigurationOptions> option)
        {
            mvcBuilder.Services.Configure(option);
            mvcBuilder.AddConfigurationManagement();
            return mvcBuilder;
        }

        /// <summary>
        /// 注入服务
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        private static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IConfigurationServices, DefaultConfigurationServices>();
            services.AddScoped<IConfigurationDataServices, DefaultConfigurationDataServices>();

            if (services.BuildServiceProvider().GetRequiredService<IOptions<ConfigurationOptions>>().Value.EnableDataRoute)
            {
                services.AddScoped(typeof(IStartupFilter), typeof(COnfigurationDataStartupFilter));
            }

            //if (services.BuildServiceProvider().GetRequiredService<IOptions<ConfigurationOptions>>().Value.EnableDashBoard)
            //{
            //    services.AddScoped(typeof(IStartupFilter), typeof(ConfigurationStartupFilter));
            //}
            VirtualFileResoureInfos.Add(new List<ResoureInfo>()
            {
                new ResoureInfo(){
                    MimeType="text/heml",
                  DirectoryName="pages",
                  Names=new string[]{
                      "index.html"
                  }
                },
                new ResoureInfo()
            {
                DirectoryName = "js/test",
                Names = new string[] {
                    "jsconfig1.json"
                },
                MimeType="text/json"
            }
        });
            services.AddVirtualFileServices(options =>
            {
                options.ResouresAssembly = typeof(ServiceCollectionExtensions).Assembly;
                options.ResouresDirectoryPrefix = $"{ options.ResouresAssembly.GetName().Name}.Dashboard.Content";

            });
            return services;
        }
    }
}