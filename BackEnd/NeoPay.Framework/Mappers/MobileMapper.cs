using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.Mobile;

namespace NeoPay.Framework.Mappers;

public class MobileMapper
{
    public MobileConnectionModel MapConnection(ConnectionEntity connection)
    {
        var address = connection.Customer?.Address;
        var locationLabel = address != null
            ? $"{address.Street} {address.House}, {address.City}"
            : "No address";

        return new MobileConnectionModel
        {
            Id            = connection.Id,
            CustomerName  = $"{connection.Customer?.FirstName} {connection.Customer?.LastName}".Trim(),
            LocationLabel = locationLabel,
            UtilityName   = connection.UtilityEntity?.Name ?? "Unknown",
            Status        = MapConnectionStatus(connection.Status),
            MeterId       = connection.Meter?.Id
        };
    }

    public MobileConnectionDetailModel MapConnectionDetail(ConnectionEntity connection)
    {
        var basic = MapConnection(connection);
        return new MobileConnectionDetailModel
        {
            Id            = basic.Id,
            CustomerName  = basic.CustomerName,
            LocationLabel = basic.LocationLabel,
            UtilityName   = basic.UtilityName,
            Status        = basic.Status,
            MeterId       = basic.MeterId,
            Meter         = connection.Meter != null ? MapMeter(connection.Meter) : null
        };
    }

    public List<MobileConnectionModel> MapConnections(IEnumerable<ConnectionEntity> connections)
    {
        return connections.Select(MapConnection).ToList();
    }

    public MobileMeterModel MapMeter(MeterEntity meter)
    {
        return new MobileMeterModel
        {
            Id                   = meter.Id,
            SerialNumber         = meter.SerialNumber,
            BarcodeValue         = meter.BarcodeValue,
            Digits               = meter.Digits,
            Multiplier           = meter.Multiplier,
            AssignedConnectionId = meter.ConnectionId.Value
        };
    }

    public MobileReadingModel MapReading(ConsumptionRecord record)
    {
        return new MobileReadingModel
        {
            Id        = record.Id,
            MeterId   = record.MeterId,
            Timestamp = record.ReadingTimestamp,
            Value     = record.Value,
            Source    = record.Source,
            Note      = record.Note
        };
    }

    public ConsumptionRecord MapCreateReading(CreateMobileReadingModel model)
    {
        return new ConsumptionRecord
        {
            MeterId           = model.MeterId,
            Value             = model.Value,
            AmountUsed        = 0, // Will be calculated by service
            ReadingTimestamp  = model.Timestamp,
            Source            = model.Source,
            Note              = model.Note,
            ExceptionReason   = model.ExceptionReason,
            ClientGeneratedId = model.ClientGeneratedId
        };
    }

    private static string MapConnectionStatus(int status)
    {
        return status switch
        {
            0 => "Inactive",
            1 => "Active",
            2 => "Suspended",
            _ => "Unknown"
        };
    }
}
