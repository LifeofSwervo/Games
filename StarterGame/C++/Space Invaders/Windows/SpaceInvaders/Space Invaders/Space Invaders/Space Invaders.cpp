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

const char* MENU_OPTIONS[] = { "Start Game", "Close Game"};
int TOTAL_OPTIONS = 2;






// Player Init
Vector2 PLAYER_SIZE = { 25.0f, 25.0f };
Vector2 PLAYER_POS = { SCREEN_WIDTH / 2.0f, SCREEN_HEIGHT / 1.05f };


//------------------------------------------------------------------------------------------
// Declare Vars
//------------------------------------------------------------------------------------------
int selectedOption = 0;



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
GameScreen currentScreen = LOGO;

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

class Particle {
public:
    Vector2 position;
    Vector2 velocity;
    float radius;
    Color color;
    float opacity;
    bool fades;

    // Default constructor
    Particle() : position({ 0, 0 }), velocity({ 0, 0 }), radius(0), color(WHITE), opacity(1.0f), fades(false) {}

    // Constructor
    Particle(Vector2 pos, Vector2 vel, float rad, Color col, bool fade)
        : position(pos), velocity(vel), radius(rad), color(col), opacity(1.0f), fades(fade) {}

    // Draw method
    void Draw() {
        DrawCircleV(position, radius, Fade(color, opacity));
    }

    void Movement()
    {
        position.x += velocity.x;
        position.y += velocity.y;
    }

    void FadeLogic()
    {
        if (fades && opacity > 0.0f)
        {
            opacity -= 0.01f;
            if (opacity <= 0.0f)
            {
                opacity = 0.0f;
            }
        }
    }

    void Update()
    {
        Draw();
        Movement();
        FadeLogic();
    }
};
std::vector<Particle> particles(100); // Array storing particles (for stars)
std::vector<Particle> particleExplosion(15);


//------------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------------
void InitStars(void)
{
    // Initialize Stars
    for (int i = 0; i < 100; i++)
    {
        Vector2 position = { static_cast<float>(rand()) / RAND_MAX * SCREEN_WIDTH, static_cast<float>(rand()) / RAND_MAX * SCREEN_HEIGHT };
        Vector2 velocity = { 0.0f, 0.3f };
        float radius = static_cast<float>(rand()) / RAND_MAX * 2;
        Color color = WHITE;

        particles.push_back(Particle(position, velocity, radius, color, false));
    }
}

void SpawnStars(void)
{
    for (int i = 0; i < particles.size(); i++)
    {
        if (particles[i].position.y > SCREEN_HEIGHT || particles[i].opacity <= 0)
        {
            Vector2 position = { static_cast<float>(rand()) / RAND_MAX * SCREEN_WIDTH, -particles[i].radius };
            Vector2 velocity = { 0.0f, 0.3f };
            float radius = static_cast<float>(rand()) / RAND_MAX * 2;
            Color color = WHITE;

            particles[i] = Particle(position, velocity, radius, color, false);
        }
    }
}

//----------------------------------------------------------------------------------
// Star Logic function:
//----------------------------------------------------------------------------------
void StarLogic(void)
{
    for (size_t i = 0; i < particles.size(); i++) {
        Particle& particle = particles[i];

        if (particle.position.y - particle.radius >= SCREEN_HEIGHT) {
            particle.position.x = static_cast<float>(rand()) / RAND_MAX * SCREEN_WIDTH;
            particle.position.y = -particle.radius;
            particle.opacity = 1.0f; // Reset opacity if needed
        }
 
        if (particle.opacity <= 0) {
            // Reset particle instead of erasing
            particle.position.x = static_cast<float>(rand()) / RAND_MAX * SCREEN_WIDTH;
            particle.position.y = -particle.radius;
            particle.opacity = 1.0f; // Reset opacity
        }
        else {
            particle.Update();
        }
    }
}


void TitleMenu(void)
{
    ClearBackground(BLACK);
    for (int i = 0; i < TOTAL_OPTIONS; i++) {
        Color color = (i == selectedOption) ? RED : DARKGREEN;
        DrawText(MENU_OPTIONS[i], SCREEN_WIDTH / 2 - MeasureText(MENU_OPTIONS[i], 30)/2, SCREEN_HEIGHT/2 + (i * 50), 30, color);
    }
}

void TitleMenuLogic(void)
{
    if (IsKeyPressed(KEY_DOWN)) selectedOption = (selectedOption + 1) % TOTAL_OPTIONS;
    if (IsKeyPressed(KEY_UP)) selectedOption = (selectedOption - 1 + TOTAL_OPTIONS) % TOTAL_OPTIONS;

}

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
    InitStars();
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
            TitleMenuLogic();
            StarLogic();
            SpawnStars();
            

            if (IsKeyPressed(KEY_ENTER))
            {
                if (selectedOption == 0)
                {
                    currentScreen = GAMEPLAY;
                }
                else if (selectedOption == 1)
                {
                    CloseWindow(); //Exit
                    return 0;
                }
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
            TitleMenu();
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