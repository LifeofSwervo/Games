
/*
- Pong Game, Uses 2 Paddles classes, the player and computer. Along with a Ball class to play the game Pong.
*/

#include <iostream>
#include <raylib>

typedef enum GameScreen
{
    LOGO = 0,
    TITLE,
    GAMEPLAY,
    ENDING
} GameScreen;

class Ball
{
public:
    float x, y;
    int speedX, speedY;
    int radius;

    void Draw()
    {
        DrawCircle(x, y, radius, WHITE);
    }

    void Update()
    {
        x += speedX;
        y += speedY;

        // Borders
        if (y + radius >= GetScreenHeight() || y - radius <= 0)
        { // Bottom or Top of Screen
            speedY *= -1;
        }

        // CPU Wins
        if (x + radius >= GetScreenWidth())
        {
            // CpuScore++;
            ResetBall();
        }

        // Player Wins
        if (x - radius <= 0)
        {
            // CpuScore++;
            ResetBall();
        }
    }

    void ResetBall()
    {
        x = GetScreenWidth() / 2;
        y = GetScreenHeight() / 2;

        int speedChoices[2] = {-1, 1};
        speedX = 7 * speedChoices[GetRandomValue(0, 1)];
        speedY = 7 * speedChoices[GetRandomValue(0, 1)];
    }
};

Ball ball;

int main()
{
    // Screen Configurations
    const int SCREEN_WIDTH = 1280;
    const int SCREEN_HEIGHT = 800;
    const char *SCREEN_TITLE = "Test Title";
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_TITLE);
    SetTargetFPS(60);
    GameScreen currentScreen = LOGO;

    // Init Variables
    const int MIDDLE_OF_SCREEN_X = SCREEN_WIDTH / 2;
    const int MIDDLE_OF_SCREEN_Y = SCREEN_HEIGHT / 2;
    int framesCounter = 0;

    // Ball Variables
    ball.radius = 20;
    ball.x = SCREEN_WIDTH / 2;
    ball.y = SCREEN_HEIGHT / 2;
    ball.speedX = 7;
    ball.speedY = 7;

    // Game Loop
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
            if (framesCounter > 60)
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
            ball.Update();

            // Press enter to change to ENDING screen
            if (IsKeyPressed(KEY_ENTER) || IsGestureDetected(GESTURE_TAP))
            {
                // currentScreen = ENDING;
            }
        }
        break;
        case ENDING:
        {
            // TODO: Update ENDING screen variables here!

            // Press enter to return to TITLE screen
            if (IsKeyPressed(KEY_S) || IsGestureDetected(GESTURE_TAP))
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
            DrawText("WAIT for 1 SECONDS...", 290, 220, 20, GRAY);
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
            ball.Draw();
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
        //----------------------------------------------------------------------------------
    }

    // De-Initialization
    //--------------------------------------------------------------------------------------

    // TODO: Unload all loaded data (textures, fonts, audio) here!

    CloseWindow(); // Close window and OpenGL context
    //--------------------------------------------------------------------------------------

    return 0;
}