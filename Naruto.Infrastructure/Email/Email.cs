﻿
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using Naruto.Infrastructure.Interface;
using Naruto.Infrastructure.Config;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Linq;
using Microsoft.Extensions.Options;
using Naruto.Infrastructure.Options;
using Microsoft.AspNetCore.Hosting;

namespace Naruto.Infrastructure.Email
{
    /// <summary>
    /// 邮件服务
    /// </summary>
    public class Email : IEmail
    {
        private readonly IOptions<EmailOptions> emailOptions;

        private readonly ILogger<Email> logger;
        private readonly IWebHostEnvironment webHostEnvironment;
        public Email(ILogger<Email> _logger, IOptions<EmailOptions> _emailOptions, IWebHostEnvironment _webHostEnvironment)
        {
            logger = _logger;
            emailOptions = _emailOptions;
            webHostEnvironment = _webHostEnvironment;
        }

        /// <summary>
        /// 发送邮箱
        /// </summary>
        /// <param name="msgaddress">收件人地址</param>
        /// <returns></returns>
        public async Task<int> SendEmailAsync(string msgToEmail, string title, string content = "", string html = "", string msgPath = "")
        {
            if (msgToEmail == null)
            {
                throw new ArgumentNullException("收件人邮箱不能为空");
            }
            if (title != null)
            {
                title = $"{webHostEnvironment.EnvironmentName}:{title}";
            }
            //获取数组
            string[] msgToEmails = msgToEmail.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            if (msgToEmails == null || msgToEmails.Count() <= 0)
            {
                return 0;
            }
            var res = 0;
            foreach (var item in msgToEmails)
            {
                res += await SendToEmail(item, title, content, msgPath);
            }
            return res;
        }
        ///<summary>
        /// 发送邮件
        ///</summary>
        ///<param name="sendEmailAddress">发件人邮箱</param>
        ///<param name="sendEmailPwd">发件人的邮箱授权码</param>
        ///<param name="msgToEmail">收件人邮箱地址</param>
        ///<param name="title">邮件标题</param>
        ///<param name="content">邮件内容</param>
        ///<param name="host">邮件SMTP服务器协议</param>
        ///<param name="msgaddress">需要添加的附件地址（如有多个附件则用;分割）</param>
        ///<returns>0：失败。1：成功！</returns>
        private async Task<int> SendToEmail(string msgToEmail, string title, string content, string msgaddress = "")
        {
            //发件人和收件人的邮箱地址
            MailMessage mmsg = new MailMessage(emailOptions.Value.EmailAddress, msgToEmail);
            //设置为HTML格式
            mmsg.IsBodyHtml = true;
            //邮件主题
            mmsg.Subject = title;
            //主题编码
            mmsg.SubjectEncoding = Encoding.UTF8;
            //邮件正文
            mmsg.Body = content;
            //正文编码
            mmsg.BodyEncoding = Encoding.UTF8;

            //优先级
            mmsg.Priority = MailPriority.High;
            if (!string.IsNullOrWhiteSpace(msgaddress))
            {
                //发送邮件附件   不需要注释即可
                AddAttachments(msgaddress, mmsg);
            }

            //设置邮件协议
            using (SmtpClient client = new SmtpClient())//System.Net.Mail.SmtpClient
            {
                //设置所需邮箱smtp服务器及支持的协议
                client.Host = emailOptions.Value.EmailHost;
                //QQ邮箱使用ssl加密，需要设置SmtpClient.EnableSsl 属性为True表示“指定 SmtpClient 使用安全套接字层 (SSL) 加密连接。”
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                //通过网络发送到Smtp服务器
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                //打开邮箱的smtp服务  并且 将获取的smtp授权码  （第一个参数发件人邮箱第二个参数是邮箱的授权码）
                await Task.Run(() =>
                {
                    //通过用户名和授权码
                    client.Credentials = new NetworkCredential(emailOptions.Value.EmailAddress, emailOptions.Value.EmailCode);  //System.Net.NetworkCredential
                });
                try
                {
                    await Task.Run(() =>
                    {
                        client.Send(mmsg);
                    });
                    return 1;               //发送成功
                }
                catch (Exception ex)
                {
                    logger.LogInformation($"邮箱发送错误:{ex.Message.ToString()}");
                    return 0;               //发送失败
                }
                finally
                {
                    mmsg?.Dispose();
                }
            }
        }

        ///<summary>
        /// 添加附件
        ///</summary>
        ///<param name="attachmentsPath">附件的路径集合，以分号分隔</param>
        private void AddAttachments(string attachmentsPath, MailMessage mmsg)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(attachmentsPath))
                {
                    return;
                }
                string[] path = attachmentsPath.Split(';'); //以什么符号分隔可以自定义
                Attachment data;
                ContentDisposition disposition;
                for (int i = 0; i < path.Length; i++)
                {
                    data = new Attachment(path[i], MediaTypeNames.Application.Octet);
                    disposition = data.ContentDisposition;
                    disposition.CreationDate = File.GetCreationTime(path[i]);
                    disposition.ModificationDate = File.GetLastWriteTime(path[i]);
                    disposition.ReadDate = File.GetLastAccessTime(path[i]);
                    mmsg.Attachments.Add(data);
                }
            }
            catch (Exception ex)
            {
                logger.LogInformation($"邮箱发送-上传附件错误:{ex.Message.ToString()}");
            }
        }

    }
}