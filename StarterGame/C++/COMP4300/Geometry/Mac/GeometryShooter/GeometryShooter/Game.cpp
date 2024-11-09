//  Game.cpp
#include "Game.hpp"
#include <raylib.h>


Game::Game() : m_running(true)
{
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Game");
    SetTargetFPS(60);
}


void Game::Run(void)
{
    while (!WindowShouldClose())
    {
        Update();
        Render();
    }
    CloseWindow();
}

void Game::Update()
{
    if (m_entityManager) {
    m_entityManager->Update(); // Ensure m_entityManager is valid
    }
}

void Game::Render()
{
    BeginDrawing();
    ClearBackground(RAYWHITE);
    
    if (m_entityManager)
    {
        m_entityManager->Render();
    }
    
    EndDrawing();
}
