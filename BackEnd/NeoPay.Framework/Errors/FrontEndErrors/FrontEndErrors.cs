namespace NeoPay.Framework.Errors.FrontEndErrors;

public static class FrontEndErrors
{
    public static Error UserAlreadyExists { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Register.UserAlreadyExists,
        ErrorMessage = "User already exists"
    };

    public static Error ValidationError { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.ValidationError,
        ErrorMessage = "Could not validate the model"
    };
    
    public static Error ConnectionExists { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Connection.ConnectionAlreadyExists,
        ErrorMessage = "Connection already exists"
    };

    public static Error CustomerAccountNrAlreadyExists { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Customer.CustomerAlreadyExists,
        ErrorMessage = "Customer account number already exists"
    };
    
    public static Error CustomerCouldNotBeFound { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Customer.CustomerCouldNotBeFound,
        ErrorMessage = "Customer could not be found"
    };

    public static Error WrongPasswordOrEmailError { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Login.WrongPasswordOrEmail,
        ErrorMessage = "Wrong password or email"
    };

    public static Error InvalidRefreshTokenOrAccessTokenError { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Login.InvalidRefreshTokenOrAccessToken,
        ErrorMessage = "Invalid refresh token or access token"
    };

    public static Error ErrorLoadingCustomers { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Customer.ErrorLoadingCustomers,
        ErrorMessage = "An error occurred while loading customers"
    };

    public static Error AddressCouldNotBeFound { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Address.AddressCouldNotBeFound,
        ErrorMessage = "Address could not be found"
    };

    public static Error ErrorLoadingAddresses { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Address.ErrorLoadingAddresses,
        ErrorMessage = "An error occurred while loading addresses"
    };

    public static Error ConnectionCouldNotBeFound { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Connection.ConnectionCouldNotBeFound,
        ErrorMessage = "Connection could not be found"
    };

    public static Error ErrorLoadingConnections { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Connection.ErrorLoadingConnections,
        ErrorMessage = "An error occurred while loading connections"
    };

    public static Error UtilityCouldNotBeFound { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Utility.UtilityCouldNotBeFound,
        ErrorMessage = "Utility could not be found"
    };

    public static Error ErrorLoadingUtilities { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Utility.ErrorLoadingUtilities,
        ErrorMessage = "An error occurred while loading utilities"
    };

    public static Error MeterCouldNotBeFound { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Meter.MeterCouldNotBeFound,
        ErrorMessage = "Meter could not be found"
    };

    public static Error ErrorLoadingMeters { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Meter.ErrorLoadingMeters,
        ErrorMessage = "An error occurred while loading meters"
    };

    public static Error MeterSerialNumberExists { get; } = new()
    {
        ErrorCode    = ApiErrorCodes.Meter.MeterSerialNumberExists,
        ErrorMessage = "Meter serial number already exists"
    };
}