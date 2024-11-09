Geometry Shooter Game
Description:
    This game is intended to be my introduction to ECS Architecture. Following the structure of Dave Churchill's COMP 4300 2021 Course. This would be focused on assignment 2.

Description of Game:
    A game where the player is a circle that spawns in the middle and shoots at wherever the maps clicks. They gain points by killing the shapes that are randomly spawning around them.
Enemies are similarly sized shapes that explode into particles upon death. Spawning in 1-3 second intervals. 

Files:
Common.hpp
Components.hpp
Entity.hpp
Entity.cpp
EntityManager.hpp
EntityManager.cpp
Game.hpp
Game.cpp
Main.cpp
Vec2.cpp
Vec2.hpp


File Descriptions:
    - Common.hpp:
        This file holds all the "#include" statements needed for the the game. To avoid redundancy it is easier to import all the dependancies in this file once, then import this file on all other files that require those dependancies.

    - Components.hpp




Codebase Architecture:
    Player, Enemy and Bullet attributes are able to be configured using the Config Settings (detailed below). Attributes use the acronyms listed for ease of readibility. 

    Game follows ECS Architecture, all enemies objects in the game inherit the Entity class. 

Config Settings:
Player Specifications:
Player SR, CR, FR, FG, FB, OR, OG, OB, OT, V, S
	- Shared Radius		- SR			Int
	- Collision Radius	- CR			Int
	- Fill Color 		- FR, FG, FB	Int, Int, Int
	- Outline Color 	- OR, OG, OB	Int, Int, Int
	- Outline Thickness	- OT			Int
	- Shape Vertices 	- V			    Int
	- Lifespan 			- L			    Int
	- Speed 			- S 			Float
   
Enemy Specifications:
Enemy SR, CR, OR, OG, OB, OT, VMIN, VMAX, L, SI, SMIN, SMAX
    - Shared Radius		- SR			Int
	- Collision Radius	- CR			Int
	- Fill Color 		- FR, FG, FB	Int, Int, Int
	- Outline Color 	- OR, OG, OB	Int, Int, Int
	- Outline Thickness	- OT			Int
	- Small Lifespan 	- L             Int
    - Spawn Interval    - SI            Int
    - Min/Max Speed     - SMIN, SMAX    float, float


Bullet Specifications: 
Bullet SR, CR, FR, FG, FB, OR, OG, OB, OT, V, L, S 
    - Shared Radius     - SR            Int
	- Collision Radius	- CR			Int
	- Fill Color 		- FR, FG, FB	Int, Int, Int
    - Outline Color 	- OR, OG, OB	Int, Int, Int
	- Outline Thickness	- OT			Int
   	- Shape Vertices 	- V			    Int 
    - Lifespan 			- L             Int
	- Speed 			- S 			Float





  
