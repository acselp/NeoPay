namespace NeoPay.Framework.Models.Shared.GridModels;

public class GridSearch
{
    public string?      SearchQuery   { get; set; }
    public bool         CaseSensitive { get; set; }
    public List<string> Columns       { get; set; } = new();
}