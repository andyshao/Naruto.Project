﻿using Naruto.Configuration.Management;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Naruto.Configuration.Management.Dashboard.Interface;
using Microsoft.Extensions.Options;
using Naruto.Configuration.Management.Dashboard.Services;
using System;
using Naruto.VirtualFile;
using System.Collections.Generic;
using Naruto.Configuration.Management.DB;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// 注入配置界面
    /// </summary>
    public static class ConfigurationExtensions
    {
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddConfigurationManagement(this IMvcBuilder mvcBuilder, OcelotEFOption ocelotEFOption)
        {
            mvcBuilder.Services.AddOcelotRepository(ocelotEFOption);
            mvcBuilder.Services.AddServices();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(ConfigurationExtensions).Assembly));
            });
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddConfigurationManagement(this IMvcBuilder mvcBuilder, OcelotEFOption ocelotEFOption, Action<ConfigurationOptions> option)
        {
            mvcBuilder.Services.Configure(option);
            mvcBuilder.AddConfigurationManagement(ocelotEFOption);
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddConfigurationManagement(this IMvcCoreBuilder mvcBuilder, OcelotEFOption ocelotEFOption)
        {
            mvcBuilder.Services.AddOcelotRepository(ocelotEFOption);
            mvcBuilder.Services.AddServices();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(ConfigurationExtensions).Assembly));
            });
            return mvcBuilder;
        }
        /// <summary>
        /// 注入配置界面
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddConfigurationManagement(this IMvcCoreBuilder mvcBuilder, OcelotEFOption ocelotEFOption, Action<ConfigurationOptions> option)
        {
            mvcBuilder.Services.Configure(option);
            mvcBuilder.AddConfigurationManagement(ocelotEFOption);
            return mvcBuilder;
        }
        /// <summary>
        /// 注入ocelot仓储服务
        /// </summary>
        /// <param name="services"></param>
        /// <param name="ocelotEFOption"></param>
        /// <returns></returns>
        private static IServiceCollection AddOcelotRepository(this IServiceCollection services, OcelotEFOption ocelotEFOption)
        {
            services.AddRepository()
               .AddEFOption(configureOptions =>
               {
                   configureOptions.ConfigureDbContext = ocelotEFOption.ConfigureDbContext;
                   configureOptions.UseEntityFramework<ConfigurationDbContent, SlaveConfigurationDbContent>();
                   configureOptions.IsOpenMasterSlave = ocelotEFOption.IsOpenMasterSlave;
                   configureOptions.ReadOnlyConnectionString = ocelotEFOption.ReadOnlyConnectionString;
               });
            return services;
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
                services.AddScoped(typeof(IStartupFilter), typeof(ConfigurationDataStartupFilter));
            }
            SetResoure();
            services.AddVirtualFileServices(options =>
            {
                options.ResouresAssembly = typeof(ConfigurationExtensions).Assembly;
                options.ResouresDirectoryPrefix = $"{ options.ResouresAssembly.GetName().Name}.Dashboard.Content";

            });
            return services;
        }

        private static void SetResoure()
        {
            VirtualFileResoureInfos.Add(new List<ResoureInfo>()
            {
                  new ResoureInfo(){
                    MimeType="text/html",
                  DirectoryName="pages",
                  Names=new string[]{
                       "index.html",
                        "configuration.html",
                        "configuration-add.html",
                        "configuration-edit.html",
                        "console.html"
                  }
                },
                  new ResoureInfo()
            {
                DirectoryName = "js",
                Names = new string[] {
                    "carousel",
                     "code.js",
                     "colorpicker.js",
                     "element.js",
                     "flow.js",
                     "form.js",
                     "jquery.js",
                     "laydate.js",
                     "layedit.js",
                     "layer.js",
                     "laypage.js",
                     "laytpl.js",
                     "layui.all.js",
                     "layui.js",
                     "mobile.js",
                     "okadmin.js",
                     "okBarcode.js",
                     "okContextMenu.js",
                     "okCookie.js",
                     "okGVerify.js",
                     "okLayer.js",
                     "okLoading.js",
                     "okMd5.js",
                     "okNprogress.js",
                     "okSweetAlert2.js",
                     "okTab.js",
                     "okToastr.js",
                     "okUtils.js",
                     "rate.js",
                     "slider.js",
                     "table.js",
                     "transfer.js",
                     "tree.js",
                     "upload.js",
                     "util.js"
                },
                MimeType="application/x-javascript"
            },
                  new ResoureInfo()
            {
                DirectoryName = "css",
                Names = new string[] {
                "code.css",
                "common.css",
                "index.css",
                "jquery.contextMenu.css",
                "laydate.css",
                "layer.css",
                "layui.css",
                "layui.mobile.css",
                "nprogress.css",
                "okadmin.animate.css",
                "okadmin.css",
                "okadmin.theme.css",
                "okLoading.css",
                "oksub.css",
                "iconfont.css",
                "toastr.min.css",
                },
                MimeType="text/css"
            },
                  new ResoureInfo()
                {
                    DirectoryName = "js/css",
                    Names = new string[] {
                        "icon.png",
                        },
                    MimeType="image/png"
                },
                  new ResoureInfo()
                {
                    DirectoryName = "js/css",
                    Names = new string[] {
                        "loading-1.gif",
                        "loading-0.gif"
                        },
                    MimeType="image/gif"
                },
                  new ResoureInfo()
                {
                    DirectoryName = "js/css",
                    Names = new string[] {
                        "laydate.css",
                         "layer.css",
                        },
                    MimeType="text/css"
                },
                  new ResoureInfo()
            {
                DirectoryName = "font",
                Names = new string[] {
                    "iconfont.ttf",
                    },
                MimeType="application/octet-stream"
            },
                  new ResoureInfo()
            {
                DirectoryName = "font",
                Names = new string[] {
                    "iconfont.woff",
                    },
                MimeType="font/x-woff"
            },
                  new ResoureInfo()
            {
                DirectoryName = "font",
                Names = new string[] {
                    "iconfont.woff2",
                    },
                MimeType="application/font-woff2"
            },
                  new ResoureInfo()
            {
                DirectoryName = "json",
                Names = new string[] {
                     "navs.json",
                },
                MimeType="text/json"
            },
                  new ResoureInfo()
            {
                DirectoryName = "images/png",
                Names = new string[] {

                    "icon-ext.png",
                    "avatar.png"
                },
                MimeType="image/png"
            },
                  new ResoureInfo()
                    {
                        DirectoryName = "images/gif",
                        Names = new string[] {
                            "loading-2.gif"
                        },
                        MimeType="image/gif"
                    }
        });
        }
    }
}
