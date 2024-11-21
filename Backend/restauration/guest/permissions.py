from rest_framework.permissions import BasePermission
class IsOwnerOfOrder(BasePermission):
    def has_object_permission(self, request, view, obj):
        guest = getattr(request,'guest',None)
        return obj.guest == guest