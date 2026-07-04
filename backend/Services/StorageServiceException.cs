namespace ThaoQuyenEditor.Api.Services;

public class StorageServiceException : InvalidOperationException
{
    public int? StatusCode { get; }

    public StorageServiceException(string message, int? statusCode = null, Exception? innerException = null)
        : base(message, innerException)
    {
        StatusCode = statusCode;
    }
}
