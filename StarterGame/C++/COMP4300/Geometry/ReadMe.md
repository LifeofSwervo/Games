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

File Descriptions

- Common.hpp:
  This file holds all the "#include" statements needed for the the game. To avoid redundancy it is easier to import all the dependancies in this file once, then import this file on all other files that require those dependancies.

- Components.hpp:
  This file holds individual classes that hold game data. Rather than having these scattered across the codebase, it is more organize to hold all classes of this theme together for maintainability.
  - CLifespan:
    This class relies on the "remaining" and "total" variables for tracking lifespans. As an example, if an enemy has 100 total lifespan and 30 frames of that is alive. The total variable would have the value of 'Total = 100' and remaining would have a value of 'Remaining = 70'.

Entity.cpp / Entity.hpp - Header file declares Entity methods, mainly just a tag to identify the type entity in questions, along with an ID, a boolean active indicator, along with a destroy() method. - The C++ file implements the logic for these different Entity methods. Also places tag and id as arguments to the class.

EntityManager.cpp / EntityManager.hpp - Header file contains declaration for EntityVec and EntityMap, with EntityVec being a type alias for a vector of shared pointers to Entity objects, storing all entities managed by the EntityManager. And EntityMap being the Dynamic array grouping entities based off their tag.

Game.cpp / Game.hpp - Header file declares the config variables, along with the pause functionality and the system (functions) functions. Controls spawning functionality, (for both player, enemy, bullets, and special weapons). - C++ file implements logic for the mnetioned delarations, while also accepting the configuration provided by the .txt file. The update function checks the entity tags for any entities to mark as dead.Also includes functionality for adding, returning, and removing entities.

Vec2.cpp / Vec2.hpp - These files define how operations should be handled with Vec2 objects (typically entities). Attempts to cover all forms of opertaions.

Codebase Architecture:
Player, Enemy and Bullet attributes are able to be configured using the Config Settings (detailed below). Attributes use the acronyms listed for ease of readibility.

Game follows ECS Architecture, all enemies objects in the game inherit the Entity class. This philosophy separates the Systems (logic), the Components (data), and the Objects (entites).

Config Settings:
Player Specifications:
Player SR, CR, FR, FG, FB, OR, OG, OB, OT, V, S - Shared Radius - SR Int - Collision Radius - CR Int - Fill Color - FR, FG, FB Int, Int, Int - Outline Color - OR, OG, OB Int, Int, Int - Outline Thickness - OT Int - Shape Vertices - V Int - Lifespan - L Int - Speed - S Float

Enemy Specifications:
Enemy SR, CR, OR, OG, OB, OT, VMIN, VMAX, L, SI, SMIN, SMAX - Shared Radius - SR Int - Collision Radius - CR Int - Fill Color - FR, FG, FB Int, Int, Int - Outline Color - OR, OG, OB Int, Int, Int - Outline Thickness - OT Int - Small Lifespan - L Int - Spawn Interval - SI Int - Min/Max Speed - SMIN, SMAX float, float

Bullet Specifications:
Bullet SR, CR, FR, FG, FB, OR, OG, OB, OT, V, L, S - Shared Radius - SR Int - Collision Radius - CR Int - Fill Color - FR, FG, FB Int, Int, Int - Outline Color - OR, OG, OB Int, Int, Int - Outline Thickness - OT Int - Shape Vertices - V Int - Lifespan - L Int - Speed - S Float
