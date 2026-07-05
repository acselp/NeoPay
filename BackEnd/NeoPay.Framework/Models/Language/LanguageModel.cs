using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Language;

public class LanguageModel : BaseModel
{
    public string Code { get; set; }
    public string Title { get; set; }
    public int Status { get; set; }
}
