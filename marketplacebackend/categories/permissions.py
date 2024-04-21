from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Custom permission to allow read-only access for unauthenticated users.
    """

    def has_permission(self, request, view):
        # Check if the request method is safe (GET, HEAD, OPTIONS)
        if request.method in SAFE_METHODS:
            return True  # Allow GET requests without authentication
        # For other methods (POST, PUT, DELETE), require authentication
        return request.user and request.user.is_authenticated
