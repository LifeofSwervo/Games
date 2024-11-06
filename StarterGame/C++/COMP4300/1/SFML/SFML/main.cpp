//
//  main.cpp
//  SFML
//
//  Created by Paul Thomas on 11/4/24.
//

#include <iostream>
#include <SFML/Graphics.hpp>

//Constants
const int SCREEN_WIDTH = 800;
const int SCREEN_HEIGHT = 600;

//Declare Vars
sf::RenderWindow window(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT), "SFML Window");



void WindowLoop(void)
{
    // Run loop
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
            {
                window.close();
            }
        }
        
        window.clear(sf::Color::Black);
        
        window.display();
        
        // Run the main loop
        while (window.isOpen()) {
            // Process events
            sf::Event event;
            while (window.pollEvent(event)) {
                // Close window on close event
                if (event.type == sf::Event::Closed)
                    window.close();
            }

            // Clear the window with a black color
            window.clear(sf::Color::Black);

            // Display the contents of the window
            window.display();
        }
    }
}


int main(int argc, const char * argv[]) {
    // insert code here...
    // Create a window with a title and size
        
    WindowLoop();
    return 0;
}
