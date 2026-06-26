namespace NeoPay.Framework.Models.Shared.StatusModels;

public class BaseStatusModel
{
    public bool         Success { get; set; }
    public List<string> Errors  { get; set; } = new List<string>();
}