#pragma once
#include <raylib.h>
#include <vector>
#include <memory>

class EntityManager;
class Entity;

class Game
{
public:
    Game() : m_running(true)
    {
        InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Game");
        SetTargetFPS(60);
    }

    void Run(void)
    {
        while (!WindowShouldClose())
        {
            Update();
            Render();
        }
        CloseWindow();
    }
    bool m_running = true;
    bool m_paused = false;
    int m_score = 0;

private:
    std::shared_ptr<EntityManager> m_entityManager;
    void Render()
    {
        BeginDrawing();
        ClearBackground(RAYWHITE);

        // Render Entities
        m_entityManager->Render();
    }



    // Default Constructor

    // Constructor

    void Init(void)
    {

    }

    void Update(void)
    {

    }

    // System Functions

    void sUserInput(void)
    {

    }

    void sRender(void)
    {

    }

    void sEnemySpawner(void)
    {

    }

    void sCollision(void)
    {

    }
};