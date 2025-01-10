from rest_framework_simplejwt.authentication import JWTAuthentication

class BearerJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Sprawdzanie nagłówka Authorization
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None

        # Token Bearer w formacie "Bearer <token>"
        if not auth_header.startswith('Bearer '):
            return None

        # Wyciąganie samego tokenu
        access_token = auth_header.split(' ')[1]

        # Walidacja tokenu
        try:
            validate_token = self.get_validated_token(access_token)
        except:
            return None
        
        # Pobranie użytkownika z walidowanego tokenu
        try:
            user = self.get_user(validate_token)
        except:
            return None

        return (user, validate_token)