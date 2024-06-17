from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.shortcuts import get_object_or_404
from .models import Employee
from loguru import logger
import json


def employee_crud(request, employee_id = None):
    
    if request.method == 'POST':
        emp_name = request.POST.get('emp_name')
        emp_designation = request.POST.get('emp_designation')
        emp_experiance = request.POST.get('emp_experiance')
        emp_salary = request.POST.get('emp_salary')
        emp_city = request.POST.get('emp_city')
        print(emp_name, emp_designation, emp_experiance, emp_salary, emp_city)
        # name, designation = request.POST
        # print(name, designation)
        # messages.success(request, 'Employee data stored successfully.')

        new_employee = Employee.objects.create(
            name = emp_name,
            designation = emp_designation,
            experiance = emp_experiance,
            salary = emp_salary,
            city = emp_city
        )
        return HttpResponse('c')

    if request.method == 'PUT':
        logger.debug(f'received id for update {employee_id}')
        employee = get_object_or_404(Employee, id=employee_id)

        data = json.loads(request.body.decode('utf-8'))
        employee.update_employee(
            name=data.get('emp_name'),
            designation=data.get('emp_designation'),
            experiance=data.get('emp_experience'),
            salary=data.get('emp_salary'),
            city=data.get('emp_city')
        )

        logger.info(data)

        # emp_name = request.POST.get('emp_name')
        # emp_designation = request.POST.get('emp_designation')
        # emp_experiance = request.POST.get('emp_experiance')
        # emp_salary = request.POST.get('emp_salary')
        # emp_city = request.POST.get('emp_city')
        # logger.info(request.POST)

        # print(emp_name, emp_designation, emp_experiance, emp_salary, emp_city)

        return JsonResponse({'message': f'Employee with ID {employee_id} updated successfully.'}, status=200)

    if request.method == 'DELETE':
        logger.debug(f'received id for delete {employee_id}')

        employee = get_object_or_404(Employee, id=employee_id)
        resp = employee.delete()
        logger.debug(resp)

        # redirect('/employee/')

    employees = Employee.objects.order_by('-timestapm')[:10]
    for employee in employees:
        logger.info(employee.name)
        
    return render(request, 'index.html', {'employees': employees})
