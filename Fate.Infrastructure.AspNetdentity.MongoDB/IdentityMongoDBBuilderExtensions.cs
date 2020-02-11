
using System;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.MongoDB;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{

    /// <summary>
    /// aspnetidentity��mongodb�洢��չ
    /// </summary>
    public static class IdentityMongoDBBuilderExtensions
    {
        /// <summary>
        /// Adds an Entity Framework implementation of identity information stores.
        /// </summary>
        /// <typeparam name="TContext">The Entity Framework database context to use.</typeparam>
        /// <param name="builder">The <see cref="IdentityBuilder"/> instance this method extends.</param>
        /// <returns>The <see cref="IdentityBuilder"/> instance this method extends.</returns>
        public static IdentityBuilder AddMongoDBStores(this IdentityBuilder builder)

        {
            AddStores(builder.Services, builder.UserType, builder.RoleType);
            return builder;
        }

        private static void AddStores(IServiceCollection services, Type userType, Type roleType)
        {
            var identityUserType = FindGenericBaseType(userType, typeof(IdentityUser<>));
            if (identityUserType == null)
            {
                throw new InvalidOperationException(nameof(identityUserType));
            }

            if (roleType != null)
            {
                var identityRoleType = FindGenericBaseType(roleType, typeof(IdentityRole<>));
                if (identityRoleType == null)
                {
                    throw new InvalidOperationException(nameof(identityRoleType));
                }

                services.TryAddScoped(typeof(IUserStore<>).MakeGenericType(userType), typeof(UserStore<>));
                services.TryAddScoped(typeof(IRoleStore<>).MakeGenericType(roleType), typeof(RoleStore<>));
            }
            else
            {   // No Roles
                services.TryAddScoped(typeof(IUserStore<>).MakeGenericType(userType), typeof(UserOnlyStore<>));
            }
        }

        private static TypeInfo FindGenericBaseType(Type currentType, Type genericBaseType)
        {
            var type = currentType;
            while (type != null)
            {
                var typeInfo = type.GetTypeInfo();
                var genericType = type.IsGenericType ? type.GetGenericTypeDefinition() : null;
                if (genericType != null && genericType == genericBaseType)
                {
                    return typeInfo;
                }
                type = type.BaseType;
            }
            return null;
        }
    }
}