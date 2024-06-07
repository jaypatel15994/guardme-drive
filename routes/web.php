<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware(['auth','verified'])->group(function () {
    Route::get('/dashboard', [FileController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('file-upload', [FileController::class, 'index'])->name('file.upload');
    Route::post('file-upload', [FileController::class, 'store'])->name('file.upload.store');

    Route::get('folder-upload', [FolderController::class, 'index'])->name('folder.upload');
    Route::post('folder-upload', [FolderController::class, 'store'])->name('folder.upload.store');

    Route::get('get-files-and-folders-for-parent/{id}', [FileController::class, 'getFilesAndFoldersForParent'])->name('get.files.and.folders.for.parent');
});



require __DIR__.'/auth.php';
