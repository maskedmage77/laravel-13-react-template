<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Feature tests render the Inertia root template, which calls @vite.
        // Skipping Vite keeps `php artisan test` working on a fresh clone
        // without running `npm run build` first.
        $this->withoutVite();
    }
}
