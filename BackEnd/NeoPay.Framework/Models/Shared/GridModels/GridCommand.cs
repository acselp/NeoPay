namespace NeoPay.Framework.Models.Shared.GridModels;

public class GridCommand
{
    public string           Entity     { get; set; } = null!;
    public GridSearch       Search     { get; set; } = new();
    public GridPagination   Pagination { get; set; } = new();
    public List<GridFilter> Filters    { get; set; } = new();
}