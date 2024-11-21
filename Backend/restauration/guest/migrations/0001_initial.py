# Generated by Django 5.1.3 on 2024-11-21 11:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id_bill', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('full_cost', models.FloatField(default=0)),
                ('date', models.DateField(auto_now=True)),
                ('dishes', models.ManyToManyField(blank=True, related_name='buy_dishes', to='api.dish')),
                ('drinks', models.ManyToManyField(blank=True, related_name='buy_drinks', to='api.drink')),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.table')),
            ],
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id_guest', models.AutoField(primary_key=True, serialize=False)),
                ('date_came', models.DateField(auto_now=True)),
                ('bill', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='guest.bill')),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.table')),
            ],
        ),
    ]
