/*******************************************************************************************
 * Space Invaders Game
 * Author: Clarence Thomas
 * Description - Provides a blank template of code containing different game states.
 *************************************************************************************************************************************************/
#include <raylib.h>
#include <vector>
#include <iostream>

 //------------------------------------------------------------------------------------------
 // Constants
 //------------------------------------------------------------------------------------------
int SCREEN_WIDTH = 1280;
int SCREEN_HEIGHT = 800;

// Player Init
Vector2 PLAYER_SIZE = { 25.0f, 25.0f };
Vector2 PLAYER_POS = { SCREEN_WIDTH / 2.0f, SCREEN_HEIGHT / 1.05f };


//------------------------------------------------------------------------------------------
// Types and Structures Definition
//------------------------------------------------------------------------------------------
typedef enum GameScreen
{
    LOGO = 0,
    TITLE,
    GAMEPLAY,
    ENDING
} GameScreen;
//------------------------------------------------------------------------------------------
// Classes
//------------------------------------------------------------------------------------------
class Entity
{
public:
    Vector2 position;
    Vector2 size;
    Color color;


    // Constructor
    Entity(Vector2 pos, Vector2 size, Color col)
        : position(pos), size(size), color(col) {}

    void Draw(void)
    {
        DrawRectangleV(position, size, color);
    }
};

class Player : public Entity
{
public:
    int health;
    int speed;

    // Constructor
    Player(Vector2 pos, Vector2 size, Color col, int hp, int spd)
        : Entity(pos, size, col), health(hp), speed(spd) {}

    void Movement(void)
    {
        if (IsKeyDown(KEY_LEFT))
        {
            position.x = position.x - speed;
        };
        if (IsKeyDown(KEY_RIGHT))
        {
            position.x = position.x + speed;
        };
    };

    void Update(void)
    {
        Movement();
        Draw();
    }
};


class Shot
{
public:
    float x, y;
    int speed;
    bool active;

    // Function
    void Shoot(float startX, float startY)
    {
        x = startX;
        y = startY;
        active = true;
        speed = -10.0f; // Negative speed to move up
    }

    void Movement(void)
    {
        y += speed;
    }

    void Update(void)
    {
        if (y < 0)
        {
            active = false;
        }
    }

    void Draw(void)
    {
        DrawRectangle(x, y, 5, 10, WHITE);
    }
};
//------------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------------
std::vector<Shot> shots; // Dynamic Array
void Shooting(Player& player)
{
    Shot newShot;
    newShot.Shoot(player.position.x + (player.size.x / 2), player.position.y);
    shots.push_back(newShot);
};

void UpdateAndDrawShots(void)
{
    for (size_t i = 0; i < shots.size(); ++i)
    {
        shots[i].Movement();
        shots[i].Update();

        if (shots[i].active)
        {
            shots[i].Draw();
        }
        else // Remove shot if inactive
        {
            shots.erase(shots.begin() + i);
            --i; // Adjust index after erasing
        }
    }

};
//------------------------------------------------------------------------------------
// Program main entry point
//------------------------------------------------------------------------------------

int main(void)
{
    //------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Game");
    GameScreen currentScreen = LOGO;
    int framesCounter = 0;
    SetTargetFPS(60);

    Player player(PLAYER_POS, PLAYER_SIZE, GRAY, 10, 5);

    //------------------------------------------------------------------------------------------
    // Main game loop
    //------------------------------------------------------------------------------------------
    // Main game loop
    while (!WindowShouldClose()) // Detect window close button or ESC key
    {
        // Update
        //----------------------------------------------------------------------------------
        switch (currentScreen)
        {
        case LOGO:
        {
            // TODO: Update LOGO screen variables here!
            framesCounter++; // Count frames
            // Wait for 2 seconds (120 frames) before jumping to TITLE screen
            if (framesCounter > 120)
            {
                currentScreen = TITLE;
            }
        }
        break;
        case TITLE:
        {
            // TODO: Update TITLE screen variables here!

            // Press enter to change to GAMEPLAY screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {
                currentScreen = GAMEPLAY;
            }
        }
        break;
        case GAMEPLAY:
        {
            // TODO: Update GAMEPLAY screen variables here!
            player.Update();

            if (IsKeyPressed(KEY_SPACE))
            {
                Shooting(player);
            }


            // Press enter to change to ENDING screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {

            }
        }
        break;
        case ENDING:
        {
            // TODO: Update ENDING screen variables here!

            // Press enter to return to TITLE screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {
                currentScreen = TITLE;
            }
        }
        break;
        default:
            break;
        }
        //----------------------------------------------------------------------------------
        // Draw
        //----------------------------------------------------------------------------------
        BeginDrawing();

        ClearBackground(RAYWHITE);

        switch (currentScreen)
        {
        case LOGO:
        {
            // TODO: Draw LOGO screen here!
            DrawText("LOGO SCREEN", 20, 20, 40, LIGHTGRAY);
            DrawText("WAIT for 2 SECONDS...", 290, 220, 20, GRAY);
        }
        break;
        case TITLE:
        {
            // TODO: Draw TITLE screen here!
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, GREEN);
            DrawText("TITLE SCREEN", 20, 20, 40, DARKGREEN);
            DrawText("PRESS ENTER or TAP to JUMP to GAMEPLAY SCREEN", 120, 220, 20, DARKGREEN);
        }
        break;
        case GAMEPLAY:
        {
            // TODO: Draw GAMEPLAY screen here!
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, PURPLE);
            DrawText("GAMEPLAY SCREEN", 20, 20, 40, MAROON);
            DrawText("PRESS ENTER or TAP to JUMP to ENDING SCREEN", 130, 220, 20, MAROON);

            player.Draw();
            UpdateAndDrawShots();


        }
        break;
        case ENDING:
        {
            // TODO: Draw ENDING screen here!
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, BLUE);
            DrawText("ENDING SCREEN", 20, 20, 40, DARKBLUE);
            DrawText("PRESS ENTER or TAP to RETURN to TITLE SCREEN", 120, 220, 20, DARKBLUE);
        }
        break;
        default:
            break;
        }
        EndDrawing();

    }
    //--------------------------------------------------------------------------------------
    // De-Initialization
    //--------------------------------------------------------------------------------------
    // TODO: Unload all loaded data (textures, fonts, audio) here!
    CloseWindow(); // Close window and OpenGL context
    //--------------------------------------------------------------------------------------
    return 0;
}