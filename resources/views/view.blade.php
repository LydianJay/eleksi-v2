@viteReactRefresh
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('assets/images/logo.png') }}" type="image/x-icon">
    <title>{{ config('app.name') }}</title>

    @vite([
        'resources/js/react/main.jsx',
        'resources/js/app.js',
    ])

</head>

<body>
    <div id="react-root"></div>
</body>

</html>