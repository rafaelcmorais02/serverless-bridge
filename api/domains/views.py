from rest_framework import response, views


class ExampleView(views.APIView):
    def get(self, request):
        return response.Response(data='Resposta do servidor', status=200)

    def post(self, request):
        return response.Response(data=request.data['data'], status=201)
