from rest_framework import views, response

class TestView(views.APIView):
    def get(self, request):
        return  response.Response(data='funcionando', status=200)