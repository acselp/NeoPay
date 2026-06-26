namespace NeoPay.Framework.Models.Shared.StatusModels;

public class DataStatusModel<T> : BaseStatusModel
{
    public T Data { get; set; }
}