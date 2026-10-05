/* =========================================================
   CompraAmigo – control de sesión del prototipo administrador
   IMPORTANTE: es solo lógica del prototipo visual con localStorage.
   Cuando se integre el backend, este control será reemplazado por
   Spring Security + JWT.
   ========================================================= */
(function () {
    function getSession() {
        try {
            return JSON.parse(localStorage.getItem("ca_user"));
        } catch (e) {
            return null;
        }
    }

    const user = getSession();

    // Las páginas administrativas solo pueden verse con rol admin.
    if (!user) {
        window.location.replace("login.html");
        return;
    }

    if (user.role !== "admin") {
        window.location.replace("inicio.html");
        return;
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("[data-admin-logout]").forEach(function (link) {
            link.addEventListener("click", function () {
                localStorage.removeItem("ca_user");
            });
        });
    });
})();
