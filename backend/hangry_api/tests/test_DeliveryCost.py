from api.controllers import Delivery
from types import SimpleNamespace

def test_LotsOfItems():
  #Arrange
  order = []
  order.append(SimpleNamespace(quantity=5))
  order.append(SimpleNamespace(quantity=5))
  order.append(SimpleNamespace(quantity=5))
  delivery_distance = 6
  #Act
  cost = Delivery.calculate(order,delivery_distance)
  #Assert
  assert cost == 7.5

def test_MiddleOfTheRoadItems():
  #Arrange
  order = []
  order.append(SimpleNamespace(quantity=2))
  order.append(SimpleNamespace(quantity=2))
  order.append(SimpleNamespace(quantity=2))
  delivery_distance = 4
  #Act
  cost = Delivery.calculate(order,delivery_distance)
  #Assert
  assert cost == 5

def test_LittleItems():
  #Arrange
    order = []
    order.append(SimpleNamespace(quantity=2))
    order.append(SimpleNamespace(quantity=2))
    delivery_distance = 3
  #Act
    cost = Delivery.calculate(order,delivery_distance)
  #Assert
    assert cost == 3.5


def test_small_order_short_distance():
    #Arrange
    order = []
    order.append(SimpleNamespace(quantity=3))
    order.append(SimpleNamespace(quantity=1))
    del_dist = 2

    #Act
    cost = Delivery.calculate(order, del_dist)

    #Assert
    assert cost == 3.50
