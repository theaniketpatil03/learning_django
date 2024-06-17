from django.db import models
import uuid
from django.utils import timezone
# Create your models here.
import pytz

def get_kolkata_time():
    kolkata = pytz.timezone('Asia/kolkata')
    return timezone.now().astimezone(kolkata)

class Employee(models.Model):

    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, null=False)
    designation = models.CharField(max_length=50, null=False)
    experiance = models.IntegerField(null=False)
    salary = models.IntegerField(null=False)
    city = models.CharField(max_length=50, null=False)
    timestapm = models.DateTimeField(default=get_kolkata_time)


    def update_employee(self, name, designation, experiance, salary, city):

        if name:
            self.name = name

        if designation:
            self.designation = designation

        if experiance:
            self.experiance = experiance

        if salary:
            self.salary = salary

        if city:
            self.city = city

        self.save()