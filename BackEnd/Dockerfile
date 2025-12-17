# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["NeoPay.sln", "./"]
COPY ["NeoPay.Api/NeoPay.Api.csproj", "NeoPay.Api/"]
COPY ["NeoPay.Application/NeoPay.Application.csproj", "NeoPay.Application/"]
COPY ["NeoPay.Domain/NeoPay.Domain.csproj", "NeoPay.Domain/"]
COPY ["NeoPay.Framework/NeoPay.Framework.csproj", "NeoPay.Framework/"]
COPY ["NeoPay.Infrastructure/NeoPay.Infrastructure.csproj", "NeoPay.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "NeoPay.Api/NeoPay.Api.csproj"

# Copy the rest of the source code
COPY . .

# Build the application
WORKDIR "/src/NeoPay.Api"
RUN dotnet build "NeoPay.Api.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "NeoPay.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NeoPay.Api.dll"]
