//
//  main.cpp
//  Test3
//
//  Created by Paul Thomas on 9/16/24.
//

#include <iostream>
#include <raylib.h>

using namespace std;

typedef enum GameScreen
{
    LOGO = 0,
    TITLE,
    GAMEPLAY,
    ENDING
} GameScreen;

// Screen Variables
const int SCREEN_WIDTH = 1280;
const int SCREEN_HEIGHT = 800;
const int MIDDLE_OF_SCREEN_X = SCREEN_WIDTH / 2;
const int MIDDLE_OF_SCREEN_Y = SCREEN_HEIGHT / 2;

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

class Paddle {
    protected:
    void LimitMovement(){
        if (y <= 0) {
            y = 0;
        }
        if (y + height >= GetScreenHeight()) {
            y = GetScreenHeight() - height;
        }
    }
    public:
        float x, y;
        float width, height;
        int speed;
    
    void Draw() {
        DrawRectangleRounded(Rectangle{x, y, width, height}, 0.8, 0, WHITE);
    }
    
    void Movement() {
        if (IsKeyDown(KEY_UP)){
            y = y - speed;
        }
        if (IsKeyDown(KEY_DOWN)) {
            y = y + speed;
        }
    }
    
    void Update() {
        Movement();
        LimitMovement();
    }
    
};

class CpuPaddle : public Paddle {
public:
    void Update(int ballY) {
        if (y + height / 2 > ballY) {
            y = y - speed;
        }
        if (y + height / 2 <= ballY) {
            y = y + speed;
        }
        LimitMovement();
    }
};

// Initilize Ball, Player Paddle, and CPU
Ball ball;
Paddle player; // Player Paddle
CpuPaddle cpu;

// Menu Buttons
bool DrawButton(Rectangle bounds, const char *text)
{
    // Check if mouse is over the button
    bool isMouseOver = CheckCollisionPointRec(GetMousePosition(), bounds);

    // Draw the button
    DrawRectangleRec(bounds, isMouseOver ? LIGHTGRAY : GRAY);
    DrawRectangleLinesEx(bounds, 2, DARKGRAY);
    DrawText(text, bounds.x + bounds.width / 2 - MeasureText(text, 20) / 2, bounds.y + bounds.height / 2 - 10, 20, BLACK);

    // Check if the button is pressed
    return isMouseOver && IsMouseButtonPressed(MOUSE_LEFT_BUTTON);
}
Rectangle buttonBounds = {MIDDLE_OF_SCREEN_X - 50, MIDDLE_OF_SCREEN_Y + 100, 100, 50};

int main()
{
    cout << "Starting the game...";
    // Screen Configurations

    const char *SCREEN_TITLE = "Test Title";
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_TITLE);
    SetTargetFPS(60);
    GameScreen currentScreen = LOGO;

    // Init Variables

    int framesCounter = 0;

    // Menu Variables
    const char *menuOptions[] = {"Start Game"};
    int menuOptionsCount = sizeof(menuOptions) / sizeof(menuOptions[0]); // Get the number of options in the menu
    int selectedOption = 0;

    // Ball Variables
    ball.radius = 20;
    ball.x = SCREEN_WIDTH / 2;
    ball.y = SCREEN_HEIGHT / 2;
    ball.speedX = 7;
    ball.speedY = 7;
    
    // Player Variables
    player.width = 25;
    player.height = 120;
    player.x = SCREEN_WIDTH - player.width - 10;
    player.y = SCREEN_HEIGHT / 2 - player.height / 2;
    player.speed = 6;
    
    // CPU Variables
    cpu.height = 120;
    cpu.width = 25;
    cpu.x = 10;
    cpu.y = SCREEN_HEIGHT / 2 - cpu.height / 2;
    cpu.speed = 6;

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
            player.Update();
            cpu.Update(ball.y);

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

        // Drawing Segment
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
            // Draw menu options
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, GREEN);
            DrawText("TITLE SCREEN", 20, 20, 40, DARKGREEN);
            for (int i = 0; i < menuOptionsCount; i++)
            {
                Color color = (i == selectedOption) ? RED : DARKGREEN; // Turns option red once selected and Dark Green otherwise
                DrawText(menuOptions[i], MIDDLE_OF_SCREEN_X - MeasureText(menuOptions[i], 20) / 2, MIDDLE_OF_SCREEN_Y + i * 30, 20, color);
            }
        }
        break;
        case GAMEPLAY:
        {
            // TODO: Draw GAMEPLAY screen here!
            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, PURPLE);
            DrawText("GAMEPLAY SCREEN", 20, 20, 40, MAROON);
            DrawText("PRESS ENTER or TAP to JUMP to ENDING SCREEN", 130, 220, 20, MAROON);
            ball.Draw();
            cpu.Draw();
            player.Draw();
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
