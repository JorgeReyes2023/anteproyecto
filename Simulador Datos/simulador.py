import paho.mqtt.client as mqtt   #Importa la librería para usar MQTT en Python.
import json
import random
import time
from datetime import datetime

broker = "212.24.104.45" #IP pública del servidor donde tienes Mosquitto corriendo.

#Crea un cliente MQTT identificado como "nodo1" (simulando un microcontrolador).
client = mqtt.Client(client_id="nodo1", protocol=mqtt.MQTTv311, userdata=None, transport="tcp")

#Establece una conexión con Mosquitto en el puerto 1883 (el puerto MQTT por defecto).
client.connect(broker, 1883, 60)

#Simula valores para voltaje y temperatura, y obtiene el timestamp actual.
while True:
    timestamp = datetime.utcnow().isoformat()
    voltaje = random.uniform(210, 230)
    temperatura = random.uniform(20, 30)

    #Empaqueta el dato de voltaje como un objeto JSON.
    payload1 = json.dumps({
        "sensorId": 1,
        "voltaje": round(voltaje, 2),
        "timestamp": timestamp
    })
    payload2 = json.dumps({
        "sensorId": 2,
        "temperatura": round(temperatura, 2),
        "timestamp": timestamp
    })

    #Publica el dato en el topic nodo/1/voltaje.
    client.publish("nodo/1/voltaje", payload1)
    client.publish("nodo/1/temperatura", payload2)

    #Imprime en consola lo que se envió, útil para monitorear que funcione.
    print("Enviados:", payload1, payload2)
    time.sleep(5)
