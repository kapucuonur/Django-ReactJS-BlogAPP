from django.urls import path, include
from .views import ArticleViewSet,UserViewSet
from rest_framework.routers import DefaultRouter
from django.views.generic import RedirectView
router = DefaultRouter()

router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet)


urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('api/', include(router.urls)),
]

