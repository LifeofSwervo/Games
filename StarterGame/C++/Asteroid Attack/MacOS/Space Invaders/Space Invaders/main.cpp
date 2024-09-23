/*******************************************************************************************
* Space Invader Game made using raylib.
* Author: Clarence Thomas
* Description - Small game made in the process of learning C++.
*************************************************************************************************************************************************/

#include <raylib.h>

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
typedef struct Player{
    Rectangle rec;
    Vector2 speed;
    Color color;
} Player;

typedef struct Enemy{
    Rectangle rec;
    Vector2 speed;
    bool active;
    Color color;
} Enemy;

typedef struct Shoot{
    Rectangle rec;
    Vector2 speed;
    bool active;
    Color color;
} Shoot;
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
// Module Functions Declaation
//---------------------------------------------------------------------------------------
static void InitGame(void);
static void UpdateGame(void);
static void DrawGame(void);
static void UnloadGame(void);
static void UpdateDrawFrame(void);
//---------------------------------------------------------------------------------------
// Program main entry point
//---------------------------------------------------------------------------------------
int main(void)
{
    //---------------------------------------------------------------------------------------
    // Initilization
    //---------------------------------------------------------------------------------------
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "raylib [core] example - basic screen manager");
    GameScreen currentScreen = LOGO;
    InitGame();
    int framesCounter = 0;          // Useful to count frames
    SetTargetFPS(60);               // Set desired framerate (frames-per-second)
    //---------------------------------------------------------------------------------------
    // Main Game Loop
    //---------------------------------------------------------------------------------------
    while (!WindowShouldClose())    // Detect window close button or ESC key
    {
        // Update
        //----------------------------------------------------------------------------------
        switch(currentScreen)
        {
            case LOGO:
            {
                // TODO: Update LOGO screen variables here!

                framesCounter++;    // Count frames

                // Wait for 2 seconds (120 frames) before jumping to TITLE screen
                if (framesCounter > 120)
                {
                    currentScreen = TITLE;
                }
            } break;
            case TITLE:
            {
                // TODO: Update TITLE screen variables here!

                // Press enter to change to GAMEPLAY screen
                if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
                {
                    currentScreen = GAMEPLAY;
                }
            } break;
            case GAMEPLAY:
            {
                // TODO: Update GAMEPLAY screen variables here!
                UpdateDrawFrame();

                // Press enter to change to ENDING screen
                if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
                {
            
                }
            } break;
            case ENDING:
            {
                // TODO: Update ENDING screen variables here!

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

            switch(currentScreen)
            {
                case LOGO:
                {
                    // TODO: Draw LOGO screen here!
                    DrawText("LOGO SCREEN", 20, 20, 40, LIGHTGRAY);
                    DrawText("WAIT for 2 SECONDS...", 290, 220, 20, GRAY);

                } break;
                case TITLE:
                {
                    // TODO: Draw TITLE screen here!
                    DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, GREEN);
                    DrawText("TITLE SCREEN", 20, 20, 40, DARKGREEN);
                    DrawText("PRESS ENTER or TAP to JUMP to GAMEPLAY SCREEN", 120, 220, 20, DARKGREEN);

                } break;
                case GAMEPLAY:
                {
                    // TODO: Draw GAMEPLAY screen here
    

                } break;
                case ENDING:
                {
                    // TODO: Draw ENDING screen here!
                    DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, BLUE);
                    DrawText("ENDING SCREEN", 20, 20, 40, DARKBLUE);
                    DrawText("PRESS ENTER or TAP to RETURN to TITLE SCREEN", 120, 220, 20, DARKBLUE);

                } break;
                default: break;
            }

        EndDrawing();
        //----------------------------------------------------------------------------------
    }

    // De-Initialization
    //--------------------------------------------------------------------------------------

    // TODO: Unload all loaded data (textures, fonts, audio) here!

    CloseWindow();        // Close window and OpenGL context
    //--------------------------------------------------------------------------------------

    return 0;
}

void InitGame(void)
{
    // Initilize game variables
    shootRate = 0;
    pause = false;
    gameOver = false;
    victory  = false;
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
    player.color = BLACK;
    
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
        shoot[i].rec.height = 5;
        shoot[i].speed.x = 7;
        shoot[i].speed.y = 0;
        shoot[i].active = false;
        shoot[i].color = MAROON;
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
                        if (!shoot[i].active && shootRate%20 == 0)
                        {
                            shoot[i].rec.x = player.rec.x;
                            shoot[i].rec.y = player.rec.y + player.rec.height/4;
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
    
        ClearBackground(RAYWHITE);
        if (!gameOver)
        {
            
            DrawRectangleRec(player.rec, player.color);
            if (wave == FIRST) DrawText("FIRST WAVE", SCREEN_WIDTH/2 - MeasureText("FIRST WAVE", 40)/2, SCREEN_HEIGHT/2 - 40, 40, Fade(BLACK, alpha));
            else if (wave == SECOND) DrawText("SECOND WAVE", SCREEN_WIDTH/2 - MeasureText("SECOND WAVE", 40)/2, SCREEN_HEIGHT/2 - 40, 40, Fade(BLACK, alpha));
            else if (wave == THIRD) DrawText("THIRD WAVE", SCREEN_WIDTH/2 - MeasureText("THIRD WAVE", 40)/2, SCREEN_HEIGHT/2 - 40, 40, Fade(BLACK, alpha));
            
            for (int i = 0; i < activeEnemies; i++)
            {
                if (enemy[i].active) DrawRectangleRec(enemy[i].rec, enemy[i].color);
            }
            
            for (int i = 0; i < NUM_SHOOTS; i++)
            {
                if (shoot[i].active) DrawRectangleRec(shoot[i].rec, shoot[i].color);
            }
            
            DrawText(TextFormat("%04i", score), 20, 20, 40, GRAY);
            
            if (victory) DrawText("YOU WIN", SCREEN_WIDTH/2 - MeasureText("YOU WIN", 40)/2, SCREEN_HEIGHT/2 - 40, 40, BLACK);
            if (pause) DrawText("GAME PAUSED", SCREEN_WIDTH/2 - MeasureText("GAME PAUSED", 40)/2, SCREEN_HEIGHT/2 - 40, 40, GRAY);
        }
        else DrawText("PRESS [ENTER] TO PLAY AGAIN", GetScreenWidth()/2 - MeasureText("PRESS [ENTER] TO PLAY AGAIN", 20)/2, GetScreenHeight()/2 - 50, 20, GRAY);
    
}


void UpdateDrawFrame(void)
{
    UpdateGame();
    DrawGame();
}
