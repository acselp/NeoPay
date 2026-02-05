using System.ComponentModel;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Framework.Managers.AdminTable;

public class AdminTableService
{
    public async Task<PagedList<TEntity>> Search<TEntity>(GridCommand command, IQueryable<TEntity> query)
    {
        // 1. Apply Filtering (Exact Matches from GridFilter)
        if (command.Filters.Any())
        {
            foreach (var filter in command.Filters)
            {
                if (string.IsNullOrWhiteSpace(filter.Property) || filter.Value == null) continue;

                // Build Expression: e => e.Property == Value
                query = ApplyDynamicFilter(query, filter);
            }
        }

        // 2. Apply Searching (Contains logic on specific columns)
        if (!string.IsNullOrWhiteSpace(command.Search.SearchQuery) && command.Search.Columns.Any())
        {
            // Build Expression: e => e.Col1.Contains(q) || e.Col2.Contains(q)
            query = ApplyDynamicSearch(query, command.Search);
        }

        return await query.ToPagedAsync(command.Pagination.PageIndex, command.Pagination.PageSize);
    }

    private IQueryable<TEntity> ApplyDynamicFilter<TEntity>(IQueryable<TEntity> query, GridFilter filter)
    {
        var parameter = Expression.Parameter(typeof(TEntity), "e");
        var property  = Expression.Property(parameter, filter.Property!);

        // Convert the string Value to the actual property type (e.g. "1" -> int 1)
        var converter = TypeDescriptor.GetConverter(property.Type);
        if (!converter.CanConvertFrom(typeof(string))) return query; // Skip if incompatible

        var parsedValue = converter.ConvertFromInvariantString(filter.Value!);
        var constant    = Expression.Constant(parsedValue, property.Type);

        var equality = Expression.Equal(property, constant);
        var lambda   = Expression.Lambda<Func<TEntity, bool>>(equality, parameter);

        return query.Where(lambda);
    }

    // --- Helper: Dynamic Search (OR logic across columns) ---
    private IQueryable<TEntity> ApplyDynamicSearch<TEntity>(IQueryable<TEntity> query, GridSearch search)
    {
        var parameter  = Expression.Parameter(typeof(TEntity), "e");
        var searchTerm = search.SearchQuery;

        Expression? masterExpression = null;

        // Common MethodInfos for string operations
        var stringContains = typeof(string).GetMethod("Contains", new[] { typeof(string) });
        var stringToLower  = typeof(string).GetMethod("ToLower",  Type.EmptyTypes);

        foreach (var colName in search.Columns)
        {
            // Access the property
            var property = Expression.Property(parameter, colName);

            // Ensure we are searching on string properties
            if (property.Type != typeof(string)) continue;

            Expression searchExpression;
            Expression valueExpression = Expression.Constant(searchTerm);

            if (!search.CaseSensitive)
            {
                // Logic: e.Prop.ToLower().Contains(term.ToLower())
                var propertyToLower = Expression.Call(property, stringToLower!);
                var valueToLower    = Expression.Constant(searchTerm!.ToLower());
                searchExpression = Expression.Call(propertyToLower, stringContains!, valueToLower);
            }
            else
            {
                // Logic: e.Prop.Contains(term)
                searchExpression = Expression.Call(property, stringContains!, valueExpression);
            }

            // Combine with OR (e.Col1 OR e.Col2)
            masterExpression = masterExpression == null
                                   ? searchExpression
                                   : Expression.OrElse(masterExpression, searchExpression);
        }

        if (masterExpression == null) return query;

        var lambda = Expression.Lambda<Func<TEntity, bool>>(masterExpression, parameter);
        return query.Where(lambda);
    }
}