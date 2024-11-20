// Components.h
#pragma once
#include "Common.h"

class CTransform
{
public:
    Vec2 pos = { 0.0, 0.0 }; // Center of object
    Vec2 velocity = { 0.0, 0.0 };
    float angle = 0;
    
    // Constructor
    CTransform(const Vec2 & p, const Vec2 & v, float a)
    : pos(p), velocity(v), angle(a) {}
};

class CShape
{
public:
    Vector2 center;
    float radius;
    Color fillColor;
    Color outlineColor;
    float outlineThickness;
    
    // Default constructor
    CShape(Vector2 center, float radius, Color fill, Color outline, float thickness)
    : center(center), radius(radius), fillColor(fill), outlineColor(outline), outlineThickness(thickness) {}
    
    void Draw() const
    {
        DrawCircleV(center, radius, fillColor);
        /*if (outlineThickness > 0)
        {
            DrawCircleLines(center.x, center.y, radius + outlineThickness, outlineColor);
        }
        */
    }
};

class CCollision
{
public:
    float radius = 0;
    
    CCollision(float r)
        : radius(r) {}
};

class CScore
{
public:
    int score = 0;
    
    CScore(int s)
        : score(s) {}
    
};

class CLifespan
{
public:
    int remaining = 0; // "Amount of total lifespan remaining on the enemy"
    int total = 0; // "The total initial amount of lifespan"
    
    CLifespan(int remain, int total)
        : remaining(remain), total(total) {}
};

class CInput
{
public:
    bool up = false;
    bool right = false;
    bool down = false;
    bool left = false;
    
    bool shoot = false;
    
    CInput() {}
};



