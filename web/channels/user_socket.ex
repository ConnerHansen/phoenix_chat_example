defmodule Chat.UserSocket do
  use Phoenix.Socket

  # Add support for our box model stuff
  channel "box_model:*", Modeller.BoxChannel

  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
