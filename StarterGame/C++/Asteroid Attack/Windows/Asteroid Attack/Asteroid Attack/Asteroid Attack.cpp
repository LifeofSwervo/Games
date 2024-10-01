/*******************************************************************************************
* Space Invader Game made using raylib.
* Author: Clarence Thomas
* Description - Small game made in the process of learning C++.
*************************************************************************************************************************************************/

#include "raylib.h"
#include <vector>
#include <cstdlib>
#include <iostream>

//---------------------------------------------------------------------------------------
// Define Wave Info
//---------------------------------------------------------------------------------------
#define NUM_SHOOTS 50
#define NUM_MAX_ENEMIES 50
#define FIRST_WAVE 10
#define SECOND_WAVE 20
#define THIRD_WAVE 50

//---------------------------------------------------------------------------------------
// Types and Structures Definition
//---------------------------------------------------------------------------------------

typedef enum GameScreen { LOGO = 0, TITLE, GAMEPLAY, ENDING } GameScreen;
typedef enum { FIRST = 0, SECOND, THIRD } EnemyWave;

//---------------------------------------------------------------------------------------
// Class Initialization
//---------------------------------------------------------------------------------------
typedef struct Player {
    Rectangle rec;
    Vector2 speed;
    Color color;
} Player;

typedef struct Enemy {
    Rectangle rec;
    Vector2 speed;
    bool active;
    Color color;
} Enemy;

typedef struct Shoot {
    Rectangle rec;
    Vector2 speed;
    bool active;
    Color color;
} Shoot;

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
//---------------------------------------------------------------------------------------
// Global Variables Declaration
//---------------------------------------------------------------------------------------

// Constants
static const int SCREEN_WIDTH = 1280;
static const int SCREEN_HEIGHT = 800;

// Class Variables
static Player player = { 0 };
static Enemy enemy[NUM_MAX_ENEMIES] = { 0 };
static Shoot shoot[NUM_SHOOTS] = { 0 };
static EnemyWave wave = { FIRST };
std::vector<Particle> particles(100); // Array storing particles (for stars)
std::vector<Particle> particleExplosion(15);


// Variables
static bool gameOver = false;
static bool pause = false;
static int score = 0;
static bool victory = false;
static int shootRate = 0;
static float alpha = 0.0f;
static int activeEnemies = 0;
static int enemiesKill = 0;
static bool smooth = false;

//---------------------------------------------------------------------------------------
// Module Functions Declaration
//---------------------------------------------------------------------------------------
static void InitGame(void);
static void UpdateGame(void);
static void DrawGame(void);
static void SpawnStars(void);
static void StarLogic(void);
static void CreateParticleExplosion(void);
static void ParticleExplosionLogic(void);
static void DrawStartMenu(void);
//---------------------------------------------------------------------------------------
// Program main entry point
//---------------------------------------------------------------------------------------
int main(void)
{
    //---------------------------------------------------------------------------------------
    // Initilization
    //---------------------------------------------------------------------------------------
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Asteroid Attack");

    Texture2D logoShip = LoadTexture("logoShip.png");
    if (logoShip.id == 0) {
        std::cout << "Failed to load texture logoShip!" << std::endl;
    }
    else
    {
        std::cout << "Successfully loaded texture";
    }
    GameScreen currentScreen = LOGO;
    InitGame();
    int framesCounter = 0;          // Useful to count frames
    SetTargetFPS(60);               // Set desired framerate (frames-per-second)
    //---------------------------------------------------------------------------------------
    // Main Game Loop
    //---------------------------------------------------------------------------------------
    while (!WindowShouldClose())    // Detect window close button or ESC key
    {
        //----------------------------------------------------------------------------------
        // Update
        //----------------------------------------------------------------------------------
        switch (currentScreen)
        {
        case LOGO:
        {
            //----------------------------------------------------------------------------------
            // TODO: Update LOGO screen variables here!
            //----------------------------------------------------------------------------------
            framesCounter++;    // Count frames
            // Wait for 1 second (60 frames) before jumping to TITLE screen
            if (framesCounter > 60)
            {
                currentScreen = TITLE;
            }
        } break;
        case TITLE:
        {
            //----------------------------------------------------------------------------------
            // TODO: Update TITLE screen variables here!
            //----------------------------------------------------------------------------------
            // Press enter to change to GAMEPLAY screen

            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {
                currentScreen = GAMEPLAY;
            }
        } break;
        case GAMEPLAY:
        {
            //----------------------------------------------------------------------------------
            // TODO: Update GAMEPLAY screen variables here!
            //----------------------------------------------------------------------------------
            UpdateGame();
            SpawnStars();
            StarLogic();


            // Press enter to change to ENDING screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {

            }
        } break;
        case ENDING:
        {
            //----------------------------------------------------------------------------------
            // TODO: Update ENDING screen variables here!
            //----------------------------------------------------------------------------------

            // Press enter to return to TITLE screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {
                currentScreen = TITLE;
            }
        } break;
        default: break;
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
            //----------------------------------------------------------------------------------
            // TODO: Draw LOGO screen here!
            //----------------------------------------------------------------------------------
            DrawText("LOGO SCREEN", 20, 20, 40, LIGHTGRAY);
            DrawText("WAIT for 1 SECOND...", 290, 220, 20, GRAY);

        } break;
        case TITLE:
        {
            //----------------------------------------------------------------------------------
            // TODO: Draw TITLE screen here!
            //----------------------------------------------------------------------------------
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, LIGHTGRAY);
            DrawText("TITLE SCREEN", 20, 20, 40, DARKGREEN);
            DrawStartMenu();
            //DrawTexture(logoShip, SCREEN_WIDTH / 2 - logoShip.width / 2, SCREEN_HEIGHT / 2 - logoShip.height / 2, WHITE);
            
            float logoShipScale = 0.50f;
            // Center of the screen
            Vector2 screenCenter = { SCREEN_WIDTH / 2.0f, SCREEN_HEIGHT / 2.0f };
            // Adjusted position to center the texture
            Vector2 texturePosition = { screenCenter.x - (logoShip.width * logoShipScale) / 2.0f, screenCenter.y - (logoShip.height * logoShipScale) / 2.0f };
            // Drawing the texture centered on the screen
            DrawTextureEx(logoShip, texturePosition, 0.0f, logoShipScale, WHITE);

        } break;
        case GAMEPLAY:
        {   //----------------------------------------------------------------------------------
            // TODO: Draw GAMEPLAY screen here
            //----------------------------------------------------------------------------------
            DrawGame();

        } break;
        case ENDING:
        {
            //----------------------------------------------------------------------------------
            // TODO: Draw ENDING screen here!
            //----------------------------------------------------------------------------------
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, BLUE);
            DrawText("ENDING SCREEN", 20, 20, 40, DARKBLUE);
            DrawText("PRESS ENTER or TAP to RETURN to TITLE SCREEN", 120, 220, 20, DARKBLUE);

        } break;
        default: break;
        }
        EndDrawing();
    }
    //----------------------------------------------------------------------------------
    // De-Initialization
    //--------------------------------------------------------------------------------------
    // TODO: Unload all loaded data (textures, fonts, audio) here!
    UnloadTexture(logoShip);
    CloseWindow();        // Close window and OpenGL context
    //--------------------------------------------------------------------------------------

    return 0;
}

//----------------------------------------------------------------------------------
// Spawn Stars function: Respawns the particles when they move out the screen or opacity reaches 0.
//----------------------------------------------------------------------------------
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

void CreateParticleExplosion(Shoot enemy, bool fades)
{
    for (int i = 0; i < 15; i++)
    {
        Vector2 position = { enemy.rec.x + enemy.rec.width / 2, enemy.rec.y + enemy.rec.height / 2 };
        Vector2 velocity = { (static_cast<float>(rand()) / RAND_MAX - 0.5f) * 2, (static_cast<float>(rand()) / RAND_MAX - 0.5f) * 2 };
        float radius = static_cast<float>(rand()) / RAND_MAX * 3;


        Color color = WHITE;
        particleExplosion.push_back(Particle(position, velocity, radius, color, fades));

    }
}

void ParticleExplosionLogic(void)
{
    for (Particle& particleExplo : particleExplosion)
    {
        particleExplo.Update();
    }
}

void InitGame(void)
{
    particles.clear();

    // Start Menu



    // Initilize game variables
    shootRate = 0;
    pause = false;
    gameOver = false;
    victory = false;
    smooth = false;
    wave = FIRST;
    activeEnemies = FIRST_WAVE;
    enemiesKill = 0;
    score = 0;
    alpha = 0;

    // Initilize Player
    player.rec.x = 20;
    player.rec.y = 50;
    player.rec.width = 20;
    player.rec.height = 20;
    player.speed.x = 5;
    player.speed.y = 5;
    player.color = PURPLE;

    // Intilize Enemies
    for (int i = 0; i < NUM_MAX_ENEMIES; i++)
    {
        enemy[i].rec.width = 18;
        enemy[i].rec.height = 18;
        enemy[i].rec.x = GetRandomValue(SCREEN_WIDTH, SCREEN_WIDTH + 1000);
        enemy[i].rec.y = GetRandomValue(0, SCREEN_HEIGHT - enemy[i].rec.height);
        enemy[i].speed.x = 5;
        enemy[i].speed.y = 5;
        enemy[i].active = true;
        enemy[i].color = GRAY;
    }

    // Initilize Shooting logic
    for (int i = 0; i < NUM_SHOOTS; i++)
    {
        shoot[i].rec.x = player.rec.x;
        shoot[i].rec.y = player.rec.y + player.rec.height / 4;
        shoot[i].rec.width = 10;
        shoot[i].rec.height = 10;
        shoot[i].speed.x = 7;
        shoot[i].speed.y = 0;
        shoot[i].active = false;
        shoot[i].color = MAROON;
    }

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

void UpdateGame()
{

    if (!gameOver)
    {
        if (IsKeyPressed('P')) pause = !pause;

        if (!pause)
        {
            switch (wave)
            {
            case FIRST:
            {
                if (!smooth)
                {
                    alpha += 0.02f;

                    if (alpha >= 1.0f) smooth = true;
                }

                if (smooth) alpha -= 0.02f;

                if (enemiesKill == activeEnemies)
                {
                    enemiesKill = 0;

                    for (int i = 0; i < activeEnemies; i++)
                    {
                        if (!enemy[i].active) enemy[i].active = true;
                    }

                    activeEnemies = SECOND_WAVE;
                    wave = SECOND;
                    smooth = false;
                    alpha = 0.0f;
                }
            } break;
            case SECOND:
            {
                if (!smooth)
                {
                    alpha += 0.02f;

                    if (alpha >= 1.0f) smooth = true;
                }

                if (smooth) alpha -= 0.02f;

                if (enemiesKill == activeEnemies)
                {
                    enemiesKill = 0;

                    for (int i = 0; i < activeEnemies; i++)
                    {
                        if (!enemy[i].active) enemy[i].active = true;
                    }

                    activeEnemies = THIRD_WAVE;
                    wave = THIRD;
                    smooth = false;
                    alpha = 0.0f;
                }
            } break;
            case THIRD:
            {
                if (!smooth)
                {
                    alpha += 0.02f;

                    if (alpha >= 1.0f) smooth = true;
                }

                if (smooth) alpha -= 0.02f;

                if (enemiesKill == activeEnemies) victory = true;

            } break;
            default: break;
            }

            // Player movement
            if (IsKeyDown(KEY_RIGHT)) player.rec.x += player.speed.x;
            if (IsKeyDown(KEY_LEFT)) player.rec.x -= player.speed.x;
            if (IsKeyDown(KEY_UP)) player.rec.y -= player.speed.y;
            if (IsKeyDown(KEY_DOWN)) player.rec.y += player.speed.y;

            // Player collision with enemy
            for (int i = 0; i < activeEnemies; i++)
            {
                if (CheckCollisionRecs(player.rec, enemy[i].rec)) gameOver = true;
            }

            // Enemy behaviour
            for (int i = 0; i < activeEnemies; i++)
            {
                if (enemy[i].active)
                {
                    enemy[i].rec.x -= enemy[i].speed.x;

                    if (enemy[i].rec.x < 0)
                    {
                        enemy[i].rec.x = GetRandomValue(SCREEN_WIDTH, SCREEN_WIDTH + 1000);
                        enemy[i].rec.y = GetRandomValue(0, SCREEN_HEIGHT - enemy[i].rec.height);
                    }
                }
            }

            // Wall behaviour
            if (player.rec.x <= 0) player.rec.x = 0;
            if (player.rec.x + player.rec.width >= SCREEN_WIDTH) player.rec.x = SCREEN_WIDTH - player.rec.width;
            if (player.rec.y <= 0) player.rec.y = 0;
            if (player.rec.y + player.rec.height >= SCREEN_HEIGHT) player.rec.y = SCREEN_HEIGHT - player.rec.height;

            // Shoot initialization
            if (IsKeyDown(KEY_SPACE))
            {
                shootRate += 5;

                for (int i = 0; i < NUM_SHOOTS; i++)
                {
                    if (!shoot[i].active && shootRate % 20 == 0)
                    {
                        shoot[i].rec.x = player.rec.x;
                        shoot[i].rec.y = player.rec.y + player.rec.height / 4;
                        shoot[i].active = true;
                        break;
                    }
                }
            }

            // Shoot logic
            for (int i = 0; i < NUM_SHOOTS; i++)
            {
                if (shoot[i].active)
                {
                    // Movement
                    shoot[i].rec.x += shoot[i].speed.x;

                    // Collision with enemy
                    for (int j = 0; j < activeEnemies; j++)
                    {
                        if (enemy[j].active)
                        {
                            if (CheckCollisionRecs(shoot[i].rec, enemy[j].rec))
                            {
                                shoot[i].active = false;
                                enemy[j].rec.x = GetRandomValue(SCREEN_WIDTH, SCREEN_WIDTH + 1000);
                                enemy[j].rec.y = GetRandomValue(0, SCREEN_HEIGHT - enemy[j].rec.height);
                                shootRate = 0;
                                enemiesKill++;
                                score += 100;
                                CreateParticleExplosion(shoot[i], true);
                            }

                            if (shoot[i].rec.x + shoot[i].rec.width >= SCREEN_WIDTH)
                            {
                                shoot[i].active = false;
                                shootRate = 0;
                            }
                        }
                    }
                }
            }
        }
    }
    else
    {
        if (IsKeyPressed(KEY_ENTER))
        {
            InitGame();
            gameOver = false;
        }
    }
}

void DrawGame(void)
{
    ClearBackground(BLACK);
    if (!gameOver)
    {
        ParticleExplosionLogic();
        DrawRectangleRec(player.rec, player.color);
        if (wave == FIRST) DrawText("FIRST WAVE", SCREEN_WIDTH / 2 - MeasureText("FIRST WAVE", 40) / 2, SCREEN_HEIGHT / 2 - 40, 40, Fade(BLACK, alpha));
        else if (wave == SECOND) DrawText("SECOND WAVE", SCREEN_WIDTH / 2 - MeasureText("SECOND WAVE", 40) / 2, SCREEN_HEIGHT / 2 - 40, 40, Fade(BLACK, alpha));
        else if (wave == THIRD) DrawText("THIRD WAVE", SCREEN_WIDTH / 2 - MeasureText("THIRD WAVE", 40) / 2, SCREEN_HEIGHT / 2 - 40, 40, Fade(BLACK, alpha));

        for (int i = 0; i < activeEnemies; i++)
        {
            if (enemy[i].active) DrawRectangleRec(enemy[i].rec, enemy[i].color);
        }

        for (int i = 0; i < NUM_SHOOTS; i++)
        {
            if (shoot[i].active) DrawRectangleRec(shoot[i].rec, shoot[i].color);
        }



        DrawText(TextFormat("%04i", score), 20, 20, 40, GRAY);

        if (victory) DrawText("YOU WIN", SCREEN_WIDTH / 2 - MeasureText("YOU WIN", 40) / 2, SCREEN_HEIGHT / 2 - 40, 40, BLACK);
        if (pause) DrawText("GAME PAUSED", SCREEN_WIDTH / 2 - MeasureText("GAME PAUSED", 40) / 2, SCREEN_HEIGHT / 2 - 40, 40, GRAY);
    }
    else DrawText("PRESS [ENTER] TO PLAY AGAIN", GetScreenWidth() / 2 - MeasureText("PRESS [ENTER] TO PLAY AGAIN", 20) / 2, GetScreenHeight() / 2 - 50, 20, GRAY);

}

void DrawStartMenu()
{
    DrawText("Press any key to start the game!", (SCREEN_WIDTH / 2) - MeasureText("Press any key to start the game!", 50) / 2, (SCREEN_HEIGHT / 2) + SCREEN_HEIGHT / 3, 50, WHITE);
    DrawText("Asteroid Attack", (SCREEN_WIDTH / 2) - MeasureText("Asteroid Attack", 40) / 2, (SCREEN_HEIGHT / 2) - 290, 40, BLACK);
    DrawText("Escape from the asteroids!!", (SCREEN_WIDTH / 2) - MeasureText("Escape from the asteroids!!", 40) / 2, (SCREEN_HEIGHT / 2) - 240, 40, BLACK);
}