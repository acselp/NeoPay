namespace NeoPay.Framework.Errors;

public static class ApiErrorCodes
{
    public const string Forbidden           = "forbidden";
    public const string InternalServerError = "internal_server_error";
    public const string ValidationError     = "validation_error";

    public static class Register
    {
        public const string UserAlreadyExists = "user_already_exists";
    }

    public static class Login
    {
        public const string WrongPasswordOrEmail             = "wrong_password_or_email";
        public const string InvalidRefreshTokenOrAccessToken = "invalid_refresh_token_or_access_token";
    }

    public static class Customer
    {
        public const string CustomerAlreadyExists = "customer_already_exists";
        public const string CustomerCouldNotBeFound = "customer_could_not_be_found";
        public const string ErrorLoadingCustomers = "error_loading_customers";
    }

    public static class Address
    {
        public const string AddressCouldNotBeFound = "address_could_not_be_found";
        public const string ErrorLoadingAddresses = "error_loading_addresses";
    }

    public static class Connection
    {
        public const string ConnectionCouldNotBeFound = "connection_could_not_be_found";
        public const string ErrorLoadingConnections = "error_loading_connections";
        public const string ConnectionAlreadyExists = "connection_already_exists";
    }

    public static class Utility
    {
        public const string UtilityCouldNotBeFound = "utility_could_not_be_found";
        public const string ErrorLoadingUtilities = "error_loading_utilities";
    }

    public static class Meter
    {
        public const string MeterCouldNotBeFound = "meter_could_not_be_found";
        public const string ErrorLoadingMeters = "error_loading_meters";
        public const string MeterSerialNumberExists = "meter_serial_number_exists";
    }
}