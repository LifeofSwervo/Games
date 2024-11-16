// Vec2.cpp
#include "Vec2.hpp"
#include <math.h>

Vec2::Vec2()
{
    
}

Vec2::Vec2(float xin, float yin)
    :x(xin), y(yin)
{
    
}

Vec2 Vec2::operator + (const Vec2& rhs) const
{
    return Vec2(0, 0);
}

Vec2 Vec2::operator - (const Vec2& rhs) const
{
    return Vec2(0, 0);
}

Vec2 Vec2::operator / (const float val) const
{
    return Vec2(0, 0);
}

Vec2 Vec2::operator * (const float val) const
{
    return Vec2(0, 0);
}

bool Vec2::operator == (const Vec2& rhs) const
{
    return false;
}

bool Vec2::operator != (const Vec2& rhs) const
{
    return false;
}

void Vec2::operator += (const Vec2& rhs)
{
     // Todo
}

void Vec2::operator -= (const Vec2& rhs)
{
    // Todo
}

void Vec2::operator *= (const float val)
{
    // Todo
}

void Vec2::operator /= (const float val)
{
    // Todo
}

float Vec2::dist(const Vec2& rhs) const
{
    return 0;
}
