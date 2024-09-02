import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

def button1Clicked():
    print("Button 1 clicked")

def button2Clicked():
    print("Button 2 clicked")

def window(): 
    app = QApplication(sys.argv)
    parentWidget = QDialog()

    # Button 1
    button1 = QPushButton(parentWidget)
    button1.setText("Button 1")
    button1.move(50,20)
    button1.clicked.connect(button1Clicked)

    # Button 2
    button2 = QPushButton(parentWidget)
    button2.setText("Button 2")
    button2.move(50,50)
    button2.clicked.connect(button2Clicked)

    parentWidget.setGeometry(100,100,200,100)
    parentWidget.setWindowTitle("PyQt")
    parentWidget.show()

    sys.exit(app.exec_())
if __name__ == '__main__':
    window()

