namespace NeoPay.Application.Shared.Result;

public enum ResultStatusCode
{
    Success = 0,
    NotFound = 1,
    Forbidden = 2,
    Unauthenticated = 3,
    Validation = 4,
    Conflict = 5,
    Failure = 6
}