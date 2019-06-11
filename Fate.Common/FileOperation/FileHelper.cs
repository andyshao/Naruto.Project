﻿using Fate.Common.Config;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
namespace Fate.Common.FileOperation
{
    /// <summary>
    /// 文件的帮助类
    /// </summary>
    public class FileHelper
    {
        /// <summary>
        /// 获取文件写入的服务
        /// </summary>
        private UploadFile uploadFile;

        public FileHelper(UploadFile upload)
        {
            uploadFile = upload;
        }
        /// <summary>
        /// 添加文件
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<string> AddFileAsync(IFormFile file)
        {
            //获取文件上传的根地址
            string path = StaticFieldConfig.UploadFilePath;
            //获取的时间的目录
            var time = DateTime.Now.ToString("yyyMMdd");
            //目录不存在就创建一个目录
            if (!Directory.Exists(Path.Combine(path, time)))
            {
                Directory.CreateDirectory(Path.Combine(path, time));
            }
            //拼接路径
            string resPath = Path.Combine(time, DateTime.Now.Ticks + file.FileName);
            //完整的路径
            path = Path.Combine(path, resPath);
            //写入文件
            await uploadFile.UpLoadFileFromStream(file.OpenReadStream(), path);
            //判断文件是否上传成功
            if (!File.Exists(path))
            {
                resPath = "";
            }
            return resPath;
        }

        /// <summary>
        /// 文件地址的删除
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        public async Task DeleteFileAsync(string[] files)
        {
            if (files == null)
                throw new Exceptions.MyExceptions("文件路径能为空");
            await Task.Factory.StartNew(() =>
            {
                files.ToList().ForEach((item) =>
               {
                   //拼接文件存放的地址
                   var file = Path.Combine(StaticFieldConfig.UploadFilePath, item);
                   if (File.Exists(file))
                   {
                       File.Delete(file);
                   }
               });
            });
        }
    }
}
